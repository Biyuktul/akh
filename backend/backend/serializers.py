from rest_framework import serializers
from .models import officer


class OfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = officer
        fields = '__all__'
