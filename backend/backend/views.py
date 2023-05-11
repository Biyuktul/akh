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


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = officer.objects.get(logon_name=username)
    except officer.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=400)

    if user.password == password:
        # Passwords match, proceed with login
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    else:
        # Passwords do not match
        return Response({'error': 'Invalid credentials'}, status=400)


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
def update_officer(request, o_id):
    try:
        office = officer.objects.get(o_id=o_id)
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
        'created_at')).values('month').annotate(count=Count('o_id'))
    data = [{'name': month['month'].strftime(
        '%b'), 'value': month['count']} for month in officers]
    return Response(data)
