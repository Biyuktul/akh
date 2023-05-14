from django.db import models
from django.utils import timezone
from datetime import date
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User
import uuid


class officer(models.Model):
    id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    logon_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    status = models.CharField(max_length=255, null=True, default='New')
    role = models.CharField(max_length=255)
    team = models.ForeignKey('Team', on_delete=models.CASCADE, null=True)
    department = models.ForeignKey(
        'Department', on_delete=models.CASCADE, null=True)
    rank = models.CharField(max_length=255, null=True)
    created_at = models.DateField(
        default=date.today().strftime("%Y-%m-%d"), null=True)

    class Meta:
        db_table = 'officers'


class Privileges(models.Model):
    privilege_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    officer = models.ForeignKey(officer, on_delete=models.CASCADE, null=True)
    privilege_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'privilege'


class Department(models.Model):
    dept_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    dept_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'department'


class Cases(models.Model):
    case_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    case_type = models.CharField(max_length=255)
    case_description = models.TextField()
    case_created_date = models.DateField()
    date_updated = models.DateField()
    team_id = models.ForeignKey('Team', on_delete=models.CASCADE)

    class Meta:
        db_table = 'cases'


class Team(models.Model):
    team_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    case = models.ForeignKey(Cases, on_delete=models.CASCADE)
    date_created = models.DateField()

    class Meta:
        db_table = 'teams'


class Complaints(models.Model):
    comp_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    civilian_id = models.ForeignKey('Civilian', on_delete=models.CASCADE)
    date = models.DateField()
    description = models.TextField()
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=255)

    class Meta:
        db_table = 'complaints'


class Criminals(models.Model):
    criminal_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    name = models.CharField(max_length=255)
    DOB = models.DateField()
    gender = models.CharField(max_length=10)
    crime_type = models.CharField(max_length=255)
    description = models.TextField()

    class Meta:
        db_table = 'criminals'


class Civilian(models.Model):
    civilian_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)

    class Meta:
        db_table = 'civilians'


class ActivityLog(models.Model):
    log_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    activity_type = models.CharField(max_length=255)
    activity_time = models.DateTimeField()
    id = models.ForeignKey(officer, on_delete=models.CASCADE)

    class Meta:
        db_table = 'activity_log'


class Evidences(models.Model):
    evidence_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    description = models.TextField()
    date_added = models.DateField()
    evidence_type = models.CharField(max_length=255)
    evidence_data = models.FileField(upload_to='evidences/')

    class Meta:
        db_table = 'evidences'


class Witness(models.Model):
    wit_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    FIR_ID = models.ForeignKey('FIR', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)

    class Meta:
        db_table = 'witness'


class Victims(models.Model):
    vict_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    FIR_ID = models.ForeignKey('FIR', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)

    class Meta:
        db_table = 'victims'


class FIR(models.Model):
    FIR_ID = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    id = models.ForeignKey(officer, on_delete=models.CASCADE)

    class Meta:
        db_table = 'FIR'


class Post(models.Model):
    post_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    id = models.ForeignKey(officer, on_delete=models.CASCADE)
    post_type = models.CharField(max_length=50)
    post_date = models.DateTimeField(default=timezone.now)
    post_description = models.TextField()
    post_update_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.post_type

    class Meta:
        db_table = 'post'


class Suspect(models.Model):
    suspect_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    name = models.CharField(max_length=100)
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=20)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    photo = models.ImageField(
        upload_to='suspect_photos/', null=True, blank=True)
    verdict_id = models.ForeignKey(
        'Verdict', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'suspect'


class Warrant(models.Model):
    warrant_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    suspect_id = models.ForeignKey(Suspect, on_delete=models.CASCADE)
    warrant_type = models.CharField(max_length=50)
    issued_date = models.DateTimeField(default=timezone.now)
    issued_by = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.warrant_type

    class Meta:
        db_table = 'warrant'


class Verdict(models.Model):
    verdict_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4(), editable=False)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    verdict_type = models.CharField(max_length=50)
    verdict_date = models.DateTimeField(default=timezone.now)
    verdict_description = models.TextField()

    def __str__(self):
        return self.verdict_type

    class Meta:
        db_table = 'verdict'
