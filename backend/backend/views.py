from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from django.db.models.functions import TruncMonth
from django.db.models import Count
from django.contrib.auth import authenticate, login
from rest_framework_jwt.utils import jwt_encode_handler, jwt_payload_handler
from django.contrib.auth.hashers import check_password
from .serializers import OfficerSerializer, PrivilegeSerializer, ReportSerializer, DepartmentSerializer, EvidenceSerializer, PostSerializer, FIRSerializer, CivilianSerializer, ComplaintsSerializer, TeamSerializer, VictimSerializer, SuspectSerializer, CaseSerializer, WitnessSerializer
from .models import officer, Privileges, Evidences, Victims, Suspect, Cases, Witness, Team, Complaints, Report, FIR, Post, Department
from rest_framework_simplejwt.tokens import AccessToken


@api_view(['POST'])
def login_view(request):
    logon_name = request.data.get('logon_name')
    password = request.data.get('password')

    try:
        auth_officer = officer.objects.get(logon_name=logon_name)
        if auth_officer.password == password:
            token = AccessToken.for_user(auth_officer)
            serializer = OfficerSerializer(auth_officer)
            return Response({
                'token': str(token),
                'officer': serializer.data
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=400)
    except officer.DoesNotExist:
        return Response({'error': 'Officer not found'}, status=400)


@api_view(['GET', 'POST', 'PUT'])
def officers(request, id=None):
    if request.method == 'GET':
        officers = officer.objects.all()
        serializer = OfficerSerializer(officers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OfficerSerializer(data=request.data)
        if serializer.is_valid():
            department_name = request.data.get('department')
            department = get_object_or_404(
                Department, dept_name=department_name)
            serializer.validated_data['department'] = department
            officer_d = serializer.save()
            response_data = {
                'id': officer_d.id,
                'full_name': officer_d.full_name,
                'phone_number': officer_d.phone_number,
                'logon_name': officer_d.logon_name,
                'password': officer_d.password,
                'address': officer_d.address,
                'status': officer_d.status,
                'role': officer_d.role,
                'rank': officer_d.rank,
                'created_at': officer_d.created_at,
                'department': department_name
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            officer_obj = officer.objects.get(id=id)
        except officer.DoesNotExist:
            return HttpResponse(status=404)

        serializer = OfficerSerializer(officer_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def officers_per_month(request):
    officers = officer.objects.annotate(month=TruncMonth(
        'created_at')).values('month').annotate(count=Count('id'))
    data = [{'name': month['month'].strftime(
        '%b'), 'value': month['count']} for month in officers]
    return Response(data)


@api_view(['GET'])
def case_per_month(request):
    cases = Cases.objects.annotate(month=TruncMonth(
        'caseDate')).values('month').annotate(count=Count('case_id'))
    data = [{'name': month['month'].strftime(
        '%b'), 'value': month['count']} for month in cases]
    return Response(data)


@api_view(['GET'])
def open_case_per_month(request):
    open_cases = Cases.objects.filter(caseStatus='Open')  # Filter open cases
    cases = open_cases.annotate(month=TruncMonth('caseDate')).values(
        'month').annotate(count=Count('case_id'))
    data = [{'name': month['month'].strftime(
        '%b'), 'value': month['count']} for month in cases]
    return Response(data)


@api_view(['GET'])
def closed_case_per_month(request):
    closed_cases = Cases.objects.filter(
        caseStatus='Closed')  # Filter open cases
    cases = closed_cases.annotate(month=TruncMonth('caseDate')).values(
        'month').annotate(count=Count('case_id'))
    data = [{'name': month['month'].strftime(
        '%b'), 'value': month['count']} for month in cases]
    return Response(data)


@api_view(['GET'])
def complaint_per_month(request):
    complaints = Complaints.objects.annotate(month=TruncMonth(
        'complaint_date')).values('month').annotate(count=Count('complaint_id'))
    data = [{'name': month['month'].strftime(
        '%b'), 'value': month['count']} for month in complaints]
    return Response(data)


@api_view(['POST'])
def update_officer_privileges(request):
    officer_id = request.data.get('officerId')
    privileges = request.data.get('privileges')

    try:
        officer_instance = officer.objects.get(id=officer_id)

        Privileges.objects.filter(officer=officer_instance).delete()
        for privilege_name in privileges:
            privilege = Privileges.objects.create(
                officer=officer_instance,
                privilege_name=privilege_name
            )
            privilege.save()

        return Response({'message': 'Privileges updated successfully'})
    except officer.DoesNotExist:
        return Response({'message': 'Officer not found'}, status=404)
    except Exception as e:
        return Response({'message': str(e)}, status=500)


@api_view(['GET'])
def get_privilages(request, id):
    privileges = Privileges.objects.filter(officer_id=id)
    serializer = PrivilegeSerializer(privileges, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_evidence(request):
    serializer = EvidenceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    else:
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json', status=400)


@api_view(['GET'])
def get_evidence_by_case(request, case_id):
    try:
        evidence = Evidences.objects.filter(case_id=case_id)
        serializer = EvidenceSerializer(evidence, many=True)
        return Response(serializer.data)
    except Evidences.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def add_case(request):
    case_serializer = CaseSerializer(data=request.data.get('case_info'))
    victim_serializer = VictimSerializer(data=request.data.get('victim_info'))
    suspect_serializer = SuspectSerializer(
        data=request.data.get('suspect_info'))
    witness_serializer = WitnessSerializer(
        data=request.data.get('witness_info'))

    response_data = {}

    if case_serializer.is_valid():
        case = case_serializer.save()
        response_data['case'] = case_serializer.data

        team = Team.objects.create(case=case)
        response_data['team'] = TeamSerializer(team).data

        officer_ids = request.data.get('case_info', {}).get('assignTeam', [])

        for officer_id in officer_ids:
            assigned_officer = officer.objects.get(id=officer_id)
            assigned_officer.team_id = team.team_id
            assigned_officer.save()

        if victim_serializer.is_valid():
            victim_serializer.save(case=case)
            response_data['victim'] = victim_serializer.data
        else:
            response_data['victim_errors'] = victim_serializer.errors

        if suspect_serializer.is_valid():
            suspect_serializer.save(case=case)
            response_data['suspect'] = suspect_serializer.data
        else:
            response_data['suspect_errors'] = suspect_serializer.errors

        if witness_serializer.is_valid():
            witness_serializer.save(case=case)
            response_data['witness'] = witness_serializer.data
        else:
            response_data['witness_errors'] = witness_serializer.errors
    else:
        response_data['case_errors'] = case_serializer.errors

    json_data = JSONRenderer().render(response_data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['PUT'])
def update_case(request, case_id):
    try:
        case = Cases.objects.get(case_id=case_id)
        serializer = CaseSerializer(case, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Cases.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_case(request, case_id):
    try:
        case = Cases.objects.get(case_id=case_id)
        case_data = CaseSerializer(case).data

        response_data = {
            'case': case_data,
        }

        json_data = JSONRenderer().render(response_data)
        return HttpResponse(json_data, content_type='application/json')

    except Cases.DoesNotExist:
        return HttpResponse(status=404)


@api_view(['GET'])
def get_all_cases(request):
    cases = Cases.objects.all()
    response_data = []

    for case in cases:
        case_data = CaseSerializer(case).data

        try:
            team = Team.objects.get(case=case)
            team_data = TeamSerializer(team).data
        except Team.DoesNotExist:
            team_data = None

        assigned_officers = officer.objects.filter(team_id=team.team_id)
        officers_data = OfficerSerializer(assigned_officers, many=True).data

        try:
            victim = Victims.objects.get(case=case)
            victim_data = VictimSerializer(victim).data
        except Victims.DoesNotExist:
            victim_data = None

        try:
            suspect = Suspect.objects.get(case=case)
            suspect_data = SuspectSerializer(suspect).data
        except Suspect.DoesNotExist:
            suspect_data = None

        try:
            witness = Witness.objects.get(case=case)
            witness_data = WitnessSerializer(witness).data
        except Witness.DoesNotExist:
            witness_data = None
        try:
            evidence_objects = Evidences.objects.filter(case_id=case.case_id)
            evidence_data = EvidenceSerializer(
                evidence_objects, many=True).data
        except Evidences.DoesNotExist:
            evidence_data = None

        case_info = {
            'case': case_data,
            'team': team_data,
            'officers': officers_data,
            'victim': victim_data,
            'suspect': suspect_data,
            'witness': witness_data,
            'evidence': evidence_data
        }

        response_data.append(case_info)

    json_data = JSONRenderer().render(response_data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['POST'])
def add_fir(request):
    serializer = FIRSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    else:
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json', status=400)


@api_view(['POST'])
def add_civilian(request):
    serializer = CivilianSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    else:
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json', status=400)


@api_view(['POST'])
def add_complaint(request):
    data = request.data

    civilian_data = {
        'name': data.get('name'),
        'age': data.get('age'),
        'phone': data.get('phone'),
        'address': data.get('address')
    }

    complaint_data = {
        'complaint_type': data.get('complaint_type'),
        'complaint_text': data.get('complaint_text'),
        'incident_location': data.get('incident_location'),
    }

    civilian_serializer = CivilianSerializer(data=civilian_data)
    complaint_serializer = ComplaintsSerializer(data=complaint_data)

    if civilian_serializer.is_valid() and complaint_serializer.is_valid():
        civilian_instance = civilian_serializer.save()
        complaint_instance = complaint_serializer.save(
            civilian=civilian_instance)
        complaint_serializer = ComplaintsSerializer(complaint_instance)

        return Response("success", status=status.HTTP_201_CREATED)
    else:
        error_data = {}
        if not civilian_serializer.is_valid():
            error_data['civilian'] = civilian_serializer.errors
        if not complaint_serializer.is_valid():
            error_data['complaint'] = complaint_serializer.errors

        return Response(error_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_complaints(request):
    complaints = Complaints.objects.all()

    response_data = []

    for complaint in complaints:
        complaint_data = {
            'key': complaint.complaint_id,
            'complaint_id': complaint.complaint_id,
            'complaint_type': complaint.complaint_type,
            'complaint_date': complaint.complaint_date.strftime("%Y-%m-%d"),
            'complaint_body': complaint.complaint_text,
            'complaint_location': complaint.incident_location,
            'complaint_status': complaint.complaint_status,
            'civilian_id': complaint.civilian.civilian_id,
            'civilian_name': complaint.civilian.name,
            'summary_of_interview': '',
            'incident_location_detail': '',
            'additional_contacts_witnesses': '',
            'officer_remarks': '',
        }

        fir = FIR.objects.filter(civilian=complaint.civilian).first()
        if fir:
            complaint_data['summary_of_interview'] = fir.summary_of_interview
            complaint_data['incident_location_detail'] = fir.incident_location_detail
            complaint_data['additional_contacts_witnesses'] = fir.additional_contacts_witnesses
            complaint_data['officer_remarks'] = fir.officer_remark

        response_data.append(complaint_data)

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_complaint_status(request, complaint_id):
    # Retrieve the complaint object from the database based on the complaint_id
    try:
        complaint = Complaints.objects.get(complaint_id=complaint_id)
    except Complaints.DoesNotExist:
        return Response({'error': 'Complaint not found'}, status=404)

    # Update the complaint status and feedback based on the request data
    complaint.complaint_status = request.data.get(
        'complaint_status', complaint.complaint_status)
    complaint.save()

    # Return a response indicating successful update
    return Response({'message': 'Complaint status updated successfully'})


@api_view(['POST'])
def create_report(request):
    serializer = ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    else:
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json', status=400)


@api_view(['GET'])
def get_all_reports(request):
    reports = Report.objects.all()
    serializer = ReportSerializer(reports, many=True)
    serialized_data = serializer.data

    for report_data in serialized_data:
        officer_id = report_data['officer']
        officer_full_name = officer.objects.get(id=officer_id).full_name
        report_data['officer_full_name'] = officer_full_name

    return Response(serialized_data)


@api_view(['PUT'])
def update_report(request, report_id):
    try:
        report = Report.objects.get(report_id=report_id)
    except Report.DoesNotExist:
        return HttpResponse(status=404)

    serializer = ReportSerializer(report, data=request.data)
    if serializer.is_valid():
        serializer.save()
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    else:
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json', status=400)


@api_view(['DELETE'])
def delete_report(request, report_id):
    try:
        report = Report.objects.get(report_id=report_id)
        report.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Report.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_all_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)

    modified_data = []
    for item in serializer.data:
        officer_id = item['officer']
        officer_full_name = officer.objects.get(id=officer_id).full_name
        modified_item = {
            'name': item['person_name'],
            'age': item['person_age'],
            'sex': item['person_sex'],
            'description': item['person_physical_description'],
            'destinguishing_feature': item['person_distinguishing_features'],
        }
        modified_data.append(modified_item)

    return Response(modified_data)


@api_view(['PUT'])
def update_post(request, post_id):
    try:
        post = Post.objects.get(post_id=post_id)
    except Post.DoesNotExist:
        return HttpResponse(status=404)

    serializer = PostSerializer(post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    else:
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json', status=400)


@api_view(['DELETE'])
def delete_post(request, post_id):
    try:
        post = Post.objects.get(post_id=post_id)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
