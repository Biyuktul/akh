from rest_framework import serializers
from .models import officer, Privileges, Evidences, Victims, Suspect, Cases, Witness


class OfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = officer
        fields = '__all__'


class PrivilegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Privileges
        fields = '__all__'


class EvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evidences
        fields = '__all__'


class VictimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Victims
        fields = '__all__'


class SuspectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suspect
        fields = '__all__'


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cases
        fields = '__all__'


class WitnessSerializer(serialier.ModelSerializer):
    class Meta:
        model = Witness
        fields = '__all__'
