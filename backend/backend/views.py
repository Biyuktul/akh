from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import OfficerSerializer
from .models import officer


def index(request):
    return render(request, 'index.html')


@api_view(['POST'])
def add_officer(request):
    serializer = OfficerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_officers(request):
    officers = officer.objects.all()
    serializer = OfficerSerializer(officers, many=True)
    return Response(serializer.data)
