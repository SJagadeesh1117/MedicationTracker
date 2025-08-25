from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Guardian
from rest_framework import serializers
from .models import Elderly, Medication
from rest_framework import serializers
from datetime import datetime

# class GuardianRegisterSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField(write_only=True)
#     name = serializers.CharField()

class GuardianRegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=15)
    date_of_birth = serializers.DateField(
        input_formats=['%d-%m-%Y', '%Y-%m-%d']
    )
    gender = serializers.ChoiceField(choices=['Male', 'Female', 'Other'])


##############################################################

class ElderlyRegisterSerializer(serializers.Serializer):
    # class Meta:
        # model = Elderly
        # fields = ['elder_id', 'name', 'age']
        # read_only_fields = ['elder_id']  # unique_id is auto-generated

    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=15)
    date_of_birth = serializers.DateField(
        input_formats=['%d-%m-%Y', '%Y-%m-%d']
    )
    gender = serializers.ChoiceField(choices=['Male', 'Female', 'Other'])

#################################################################

class AddElderlyByGuardianSerializer(serializers.Serializer):
    elder_id = serializers.CharField()
    # name = serializers.CharField()
    name = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    guardian_id = serializers.CharField()

##################################################################

class MedicationSerializer(serializers.Serializer):
    elder_id = serializers.CharField()
    guardian_id = serializers.CharField()
    medication_name = serializers.CharField()
    dosage = serializers.CharField()
    instructions = serializers.CharField()

##################################################################

class MedicationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ['medication_name', 'dosage', 'instructions', 'created_at', 'med_id', 'status']

###################################################################


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
