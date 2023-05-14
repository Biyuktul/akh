from rest_framework import serializers
from .models import officer, Privileges


class OfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = officer
        fields = '__all__'


class PrivilegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Privileges
        fields = '__all__'
