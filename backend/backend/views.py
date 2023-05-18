from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from django.db.models.functions import TruncMonth
from django.db.models import Count
from django.contrib.auth import authenticate, login
from rest_framework_jwt.utils import jwt_encode_handler, jwt_payload_handler
from django.contrib.auth.hashers import check_password
from .serializers import OfficerSerializer, PrivilegeSerializer, EvidenceSerializer, TeamSerializer, VictimSerializer, SuspectSerializer, CaseSerializer, WitnessSerializer
from .models import officer, Privileges, Evidences, Victims, Suspect, Cases, Witness, Team
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


@api_view(['POST'])
def add_officer(request):
    serializer = OfficerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    else:
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json', status=400)


@api_view(['PUT'])
def update_officer(request, id):
    try:
        office = officer.objects.get(id=id)
    except officer.DoesNotExist:
        return HttpResponse(status=404)

    serializer = OfficerSerializer(office, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_officers(request):
    officers = officer.objects.all()
    serializer = OfficerSerializer(officers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def officers_per_month(request):
    officers = officer.objects.annotate(month=TruncMonth(
        'created_at')).values('month').annotate(count=Count('id'))
    data = [{'name': month['month'].strftime(
        '%b'), 'value': month['count']} for month in officers]
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

        officer_ids = request.data.get('case_info', {}).get('officer_ids', [])

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


@api_view(['GET'])
def get_cases(request):
    witness = Witness.objects.all()
    witness_serializer = WitnessSerializer(witness, many=True)

    case = Cases.objects.all()
    case_serializer = CaseSerializer(case, many=True)

    suspect = Suspect.objects.all()
    suspect_serializer = SuspectSerializer(suspect, many=True)

    victims = Victims.objects.all()
    victim_serializer = VictimSerializer(victims, many=True)

    response_data = {
        'witness': witness_serializer.data,
        'case': case_serializer.data,
        'suspect': suspect_serializer.data,
        'victim': victim_serializer.data
    }

    return Response(response_data)
