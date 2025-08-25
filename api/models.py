import uuid
from django.db import models
from django.contrib.auth.models import User
import datetime

def generate_guardian_id():
    return f"GDN-{uuid.uuid4().hex[:8].upper()}"

# class Guardian(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     guardian_id = models.CharField(max_length=20, unique=True, default=generate_guardian_id)
#     name = models.CharField(max_length=100)
#
#     def __str__(self):
#         return self.name

class Guardian(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    guardian_id = models.CharField(max_length=20, primary_key=True,default=generate_guardian_id)
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True, default="default@example.com")
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField(default=datetime.date(1998, 3, 24))
    gender = models.CharField(max_length=10, choices=[
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ],
    default="Male"
    )

    def __str__(self):
        return self.name


######################################################################
def generate_elderly_id():
    return f"ELD-{uuid.uuid4().hex[:6].upper()}"

class Elderly(models.Model):
    # elder_id = models.CharField(max_length=20, unique=True, default=generate_elderly_id)
    # name = models.CharField(max_length=100)
    # age = models.IntegerField()
    # guardian = models.ForeignKey(Guardian, on_delete=models.SET_NULL, null=True, blank=True, related_name="elderlies")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    elder_id = models.CharField(max_length=20, primary_key=True,default=generate_elderly_id)
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True, default="default@example.com")
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField(default=datetime.date(1998, 3, 24))
    gender = models.CharField(max_length=10, choices=[
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ],
    default="Male"
    )
    guardian = models.ForeignKey(Guardian, on_delete=models.SET_NULL, null=True, blank=True, related_name="elderlies")

    def __str__(self):
        return f"{self.name} ({self.elder_id})"


#######################################################

def generate_med_id():
    import uuid
    from .models import Medication

    while True:
        med_id = f"MED-{uuid.uuid4().hex[:6].upper()}"
        if not Medication.objects.filter(med_id=med_id).exists():
            return med_id


class Medication(models.Model):
    # elderly = models.ForeignKey(Elderly, on_delete=models.CASCADE, related_name="medications")
    # guardian = models.ForeignKey(Guardian, on_delete=models.CASCADE, related_name="medications")
    elderly = models.ForeignKey(Elderly,to_field='elder_id',  # ✅ link using elder_id instead of id
        db_column='elderly_id',
        on_delete=models.CASCADE
    )
    guardian = models.ForeignKey('Guardian', to_field='guardian_id', db_column='guardian_id', on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=50)
    med_id = models.CharField(max_length=20, unique=True, default=generate_med_id)
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[("TAKEN", "Taken"), ("NOT_TAKEN", "Not Taken")],
        default="NOT_TAKEN"
    )

    def __str__(self):
        return f"{self.medication_name} ({self.dosage}) for {self.elderly.name}"

