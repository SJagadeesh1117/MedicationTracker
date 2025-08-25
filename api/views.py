from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiExample, inline_serializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .serializers import ElderlyRegisterSerializer
from .models import Elderly
from django.contrib.auth.models import User
from .models import Elderly, Guardian, Medication
from .serializers import MedicationSerializer, MedicationListSerializer, ElderlyRegisterSerializer, \
    AddElderlyByGuardianSerializer, GuardianRegisterSerializer, LoginSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import date
from datetime import datetime


# @api_view(['POST'])
# def register_guardian(request):
#     serializer = GuardianRegisterSerializer(data=request.data)
#     if serializer.is_valid():
#         username = serializer.validated_data['username']
#         password = serializer.validated_data['password']
#         name = serializer.validated_data['name']
#
#         user, user_created = User.objects.get_or_create(username=username)
#
#         if user_created:
#             user.set_password(password)
#             user.save()
#
#         guardian, guardian_created = Guardian.objects.get_or_create(
#             user=user,
#             defaults={'name': name}
#         )
#
#         if guardian_created:
#             message = "Guardian registered successfully"
#         else:
#             message = "Guardian already exists"
#
#         return Response(
#             {
#                 "message": message,
#                 "guardian_id": guardian.guardian_id
#             },
#             status=status.HTTP_200_OK
#         )
#
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@extend_schema(
    request=GuardianRegisterSerializer,
    responses={
        200: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "message": {"type": "string"},
                    "guardian_id": {"type": "integer"}
                }
            },
            description="Guardian registered successfully"
        ),
        400: OpenApiResponse(
            description="Bad Request (Validation errors or Username already exists)"
        )
    },
    examples=[
        OpenApiExample(
            "Example Request",
            value={
                "username": "guardian123",
                "password": "secret123",
                "name": "John Doe",
                "email": "johndoe@example.com",
                "phone_number": "9876543210",
                "date_of_birth": "1985-06-15",
                "gender": "Male"
            },
            request_only=True
        ),
        OpenApiExample(
            "Example Response (Success)",
            value={
                "message": "Guardian registered successfully",
                "guardian_id": 1
            },
            response_only=True
        ),
        OpenApiExample(
            "Example Response (Error)",
            value={
                "error": "Username already exists"
            },
            response_only=True
        ),
    ]
)
@api_view(['POST'])
def register_guardian(request):
    serializer = GuardianRegisterSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        phone_number = serializer.validated_data['phone_number']
        date_of_birth = serializer.validated_data['date_of_birth']
        gender = serializer.validated_data['gender']

        # Create or get User
        user, user_created = User.objects.get_or_create(username=username)

        if user_created:
            user.set_password(password)  # Hash password
            user.save()
        else:
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Create Guardian linked to this User
        guardian, guardian_created = Guardian.objects.get_or_create(
            user=user,
            defaults={
                'name': name,
                'email': email,
                'phone_number': phone_number,
                'date_of_birth': date_of_birth,
                'gender': gender,
            }
        )

        if guardian_created:
            message = "Guardian registered successfully"
        else:
            message = "Guardian already exists"

        return Response(
            {
                "message": message,
                "guardian_id": guardian.guardian_id
            },
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


##################################################

from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiExample

@extend_schema(
    request=ElderlyRegisterSerializer,
    responses={
        200: OpenApiResponse(
            description="Elderly registered successfully",
            examples=[
                OpenApiExample(
                    "Success Response",
                    value={
                        "message": "Elderly registered successfully",
                        "elderly_id": 1
                    },
                    response_only=True
                )
            ],
        ),
        400: OpenApiResponse(
            description="Validation error / Username already exists",
            examples=[
                OpenApiExample(
                    "Error Response",
                    value={"error": "Username already exists"},
                    response_only=True
                )
            ],
        ),
    },
)

@api_view(['POST'])
def register_elderly(request):
    serializer = ElderlyRegisterSerializer(data=request.data)
    # if serializer.is_valid():
    #     elderly = serializer.save()  # unique_id is generated by default
    #     return Response(ElderlyRegisterSerializer(elderly).data, status=status.HTTP_201_CREATED)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        phone_number = serializer.validated_data['phone_number']
        date_of_birth = serializer.validated_data['date_of_birth']
        gender = serializer.validated_data['gender']

        # Create or get User
        user, user_created = User.objects.get_or_create(username=username)

        if user_created:
            user.set_password(password)  # Hash password
            user.save()
        else:
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Create Guardian linked to this User
        elderly, elderly_created = Elderly.objects.get_or_create(
            user=user,
            defaults={
                'name': name,
                'email': email,
                'phone_number': phone_number,
                'date_of_birth': date_of_birth,
                'gender': gender,
            }
        )

        if elderly_created:
            message = "Elderly registered successfully"
        else:
            message = "Elderly already exists"

        return Response(
            {
                "message": message,
                "elderly_id": elderly.elder_id
            },
            status=status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##########################################################
from drf_spectacular.utils import extend_schema, OpenApiResponse

@extend_schema(
    request=AddElderlyByGuardianSerializer,
    responses={
        200: OpenApiResponse(description="Elderly linked successfully"),
        400: OpenApiResponse(description="Validation error"),
        404: OpenApiResponse(description="Guardian or Elderly not found"),
    }
)

@api_view(['POST'])
def add_elderly_by_guardian(request):
    serializer = AddElderlyByGuardianSerializer(data=request.data)
    if serializer.is_valid():
        elder_id = serializer.validated_data['elder_id']
        name = serializer.validated_data.get('name')
        guardian_id = serializer.validated_data['guardian_id']

        try:
            #guardian = Guardian.objects.get(id=guardian_id)
            guardian = Guardian.objects.get(guardian_id=guardian_id)

        except Guardian.DoesNotExist:
            return Response({"error": "Guardian not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            elderly = Elderly.objects.get(elder_id=elder_id)
        except Elderly.DoesNotExist:
            return Response({"error": "Elderly not found"}, status=status.HTTP_404_NOT_FOUND)


        # ✅ Check if already linked
        if elderly.guardian is not None:
            if elderly.guardian == guardian:
                return Response(
                    {"error": f"Elderly {elderly.name} is already linked to this Guardian {guardian.name}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        elderly.guardian = guardian
        elderly.save()

        return Response(
            {"message": f"Elderly {elderly.name} successfully linked to Guardian {guardian.name}",
                   "name": elderly.name
             },
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##########################################################
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@extend_schema(
    request=MedicationSerializer,   # 👈 request body
    responses={
        201: OpenApiResponse(
            description="Medication added successfully",
            response={
                "message": "Medication Paracetamol added for John Doe",
                "med_id": 5
            }
        ),
        400: OpenApiResponse(
            description="Validation error",
            response={"error": "Guardian not found"}
        ),
        404: OpenApiResponse(
            description="Elderly or Guardian not found",
            response={"error": "Elderly not found"}
        ),
    },
    description="Add a new medication for an elderly person linked with a guardian."
)
@api_view(['POST'])
def add_medication(request):
    serializer = MedicationSerializer(data=request.data)
    if serializer.is_valid():
        elder_id = serializer.validated_data['elder_id']
        guardian_id = serializer.validated_data['guardian_id']
        medication_name = serializer.validated_data['medication_name']
        dosage = serializer.validated_data['dosage']
        instructions = serializer.validated_data['instructions']

        # Lookups handled in view
        try:
            elderly = Elderly.objects.get(elder_id=elder_id)
        except Elderly.DoesNotExist:
            return Response({"error": "Elderly not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            guardian = Guardian.objects.get(guardian_id=guardian_id)
        except Guardian.DoesNotExist:
            return Response({"error": "Guardian not found"}, status=status.HTTP_404_NOT_FOUND)

        # Create the medication
        medication = Medication.objects.create(
            elderly=elderly,
            guardian=guardian,
            medication_name=medication_name,
            dosage=dosage,
            instructions=instructions
        )

        return Response(
            {
                "message": f"Medication {medication.medication_name} added for {elderly.name}",
                "med_id": medication.med_id
            },
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#################################################################################
from drf_spectacular.utils import extend_schema, OpenApiParameter

@extend_schema(
    parameters=[
        OpenApiParameter("elder_id", int, OpenApiParameter.PATH, description="ID of the elderly person")
    ],
    responses={200: MedicationListSerializer(many=True), 404: dict}
)
@api_view(['GET'])
def get_elderly_medications(request, elder_id):
    try:
        elderly = Elderly.objects.get(elder_id=elder_id)
    except Elderly.DoesNotExist:
        return Response({"error": "Elderly not found"}, status=status.HTTP_404_NOT_FOUND)

    medications = Medication.objects.filter(elderly=elderly).order_by('-created_at')
    serializer = MedicationListSerializer(medications, many=True)

    return Response({
        "elder_id": elderly.elder_id,
        "elderly_name": elderly.name,
        "medications": serializer.data

    }, status=status.HTTP_200_OK)

##################################################################################

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# @api_view(['POST'])
# # @api_view(['PATCH'])
# def medication_status(request):
#     med_id = request.data.get("med_id")
#     try:
#         medication = Medication.objects.get(med_id=med_id)
#     except Medication.DoesNotExist:
#         return Response({"error": "Medication not found"}, status=status.HTTP_404_NOT_FOUND)
#
#     taken_status = request.data.get("status")  # expecting "TAKEN" or "NOT_TAKEN"
#     if taken_status not in ["TAKEN", "NOT_TAKEN"]:
#         return Response({"error": "Invalid status. Use TAKEN or NOT_TAKEN."}, status=status.HTTP_400_BAD_REQUEST)
#
#     medication.status = taken_status
#     medication.save()
#
#     return Response({
#         "med_id": medication.med_id,
#         "medication_name": medication.medication_name,
#         "status": medication.status,
#         "message": f"Medication {medication.medication_name} marked as {medication.status}"
#     }, status=status.HTTP_200_OK)
#




from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Medication
import logging
from rest_framework import status, serializers
from drf_spectacular.types import OpenApiTypes

logger = logging.getLogger(__name__)

@extend_schema(
    methods=['PATCH'],
    request=inline_serializer(
        name='UpdateMedicationStatusRequest',
        fields={
            'med_id': serializers.IntegerField(),
            'status': serializers.CharField()
        }
    ),
    responses={
        200: inline_serializer(
            name='UpdateMedicationStatusResponse',
            fields={
                'message': serializers.CharField()
            }
        ),
        400: inline_serializer(
            name='BadRequestResponse',
            fields={
                'error': serializers.CharField()
            }
        ),
        404: inline_serializer(
            name='NotFoundResponse',
            fields={
                'error': serializers.CharField()
            }
        )
    },
    description="Update the status of a medication and notify the guardian via WebSocket."
)

@api_view(['PATCH'])
def update_medication_status(request):
    try:
        med_id = request.data.get("med_id")
        new_status = request.data.get("status")

        if not med_id or not new_status:
            return Response({"error": "med_id and status are required"}, status=status.HTTP_400_BAD_REQUEST)

        medication = Medication.objects.get(med_id=med_id)
        medication.status = new_status
        medication.save()

        # Notify Guardian in real-time
        if medication.guardian:
            channel_layer = get_channel_layer()
            logger.info(f"Sending WebSocket update for guardian {medication.guardian.guardian_id}")
            async_to_sync(channel_layer.group_send)(
                f"guardian_{medication.guardian.guardian_id}",
                {
                    "type": "send_update",
                    "content": {
                        "med_id": medication.med_id,
                        "medication_name": medication.medication_name,
                        "status": new_status,
                        "elderly_id": medication.elderly.elder_id if medication.elderly else None,
                        "name": medication.elderly.name if medication.elderly else None,
                    },
                }
            )

        return Response({"message": f"Medication {med_id} status updated to {new_status}"}, status=200)

    except Medication.DoesNotExist:
        return Response({"error": "Medication not found"}, status=404)


####################################################################################

@extend_schema(
    summary="Get Guardian Elderly Count",
    description="Retrieve guardian details along with the count and list of elderlies associated.",
    parameters=[
        OpenApiParameter(name="guardian_id", description="ID of the guardian", required=True, type=int),
    ],
    responses={
        200: OpenApiResponse(
            description="Guardian details with elderly count and list",
            examples=[
                {
                    "guardian_id": 1,
                    "guardian_name": "John Doe",
                    "elderly_count": 2,
                    "elderlies": [
                        {"elder_id": 101, "name": "Elder One", "age": 75},
                        {"elder_id": 102, "name": "Elder Two", "age": 80},
                    ]
                }
            ]
        ),
        404: OpenApiResponse(description="Guardian not found"),
    }
)
@api_view(['GET'])
def get_guardian_elderly_count(request, guardian_id):
    try:
        guardian = Guardian.objects.get(guardian_id=guardian_id)
        elderlies = Elderly.objects.filter(guardian=guardian)

        # elderly_list = [
        #     {"elder_id": elder.elder_id, "name": elder.name, "age": elder.date_of_birth}
        #     for elder in elderlies
        # ]
        elderly_list = []
        for elder in elderlies:
            dob = elder.date_of_birth
            age = None
            if dob:
                today = date.today()
                age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

            elderly_list.append({
                "elder_id": elder.elder_id,
                "name": elder.name,
                "age": age
            })

        return Response(
            {
                "guardian_id": guardian.guardian_id,
                "guardian_name": guardian.name,
                "elderly_count": elderlies.count(),
                "elderlies": elderly_list

            },
            status=status.HTTP_200_OK
        )
    except Guardian.DoesNotExist:
        return Response({"error": "Guardian not found"}, status=status.HTTP_404_NOT_FOUND)


#################################################################################
@extend_schema(
    request=LoginSerializer,   # this will populate email & password fields in swagger
    responses={
        200: OpenApiResponse(response=LoginSerializer, description="Login successful"),
        400: OpenApiResponse(description="Invalid email or password"),
    }
)
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        url_name = request.resolver_match.url_name  # comes from urls.py `name=`
        if url_name == "login_guardian":
            try:
                # find guardian by email
                guardian = Guardian.objects.get(email=email)
                user = guardian.user
                # else:
                #     elderly = Elderly.objects.get(email=email)
                #     user = elderly.user
            except Guardian.DoesNotExist:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

            # check password
            if user.check_password(password):
                return Response({
                    "message": "Login successful",
                    "guardian_id": guardian.guardian_id,
                    "name": guardian.name,
                    "email": guardian.email,
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

        elif url_name == "login_elderly":
            try:
                # find guardian by email
                elderly = Elderly.objects.get(email=email)
                user = elderly.user
                # else:
                #     elderly = Elderly.objects.get(email=email)
                #     user = elderly.user
            except Elderly.DoesNotExist:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

            # check password
            if user.check_password(password):
                return Response({
                    "message": "Login successful",
                    "elderly_id": elderly.elder_id,
                    "name": elderly.name,
                    "email": elderly.email,
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"error": "Invalid path"})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

############################################################################################################