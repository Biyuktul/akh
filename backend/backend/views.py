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
from .serializers import OfficerSerializer
from .models import officer
from rest_framework_simplejwt.tokens import AccessToken


@api_view(['POST'])
def login_view(request):
    logon_name = request.data.get('logon_name')
    password = request.data.get('password')

    try:
        auth_officer = officer.objects.get(logon_name=logon_name)
        if auth_officer.password == password:
            token = AccessToken.for_user(auth_officer)
            return Response({'token': str(token)})
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
