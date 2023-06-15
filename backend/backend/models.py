from django.db import models
from django.utils import timezone
from datetime import date
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User
from django.core.files.storage import Storage
from django.core.files.storage import FileSystemStorage
import uuid


class CustomStorage(FileSystemStorage):
    def __init__(self, location=None, base_url=None):
        super().__init__(location, base_url)

    def _save(self, name, content):
        return super()._save(name, content)

    def _open(self, name, mode='rb'):
        return super()._open(name, mode)

    def get_available_name(self, name, max_length=None):
        return super().get_available_name(name, max_length)

    def exists(self, name):
        return super().exists(name)


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
    dept_name = models.CharField(
        max_length=255, primary_key=True, editable=False)

    class Meta:
        db_table = 'department'


class Cases(models.Model):
    case_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    caseType = models.CharField(max_length=255, null=True)
    casePriority = models.CharField(max_length=255, null=True)
    caseStatus = models.CharField(max_length=255, default="Open", null=True)
    caseDescription = models.TextField(max_length=255, null=True)
    caseDate = models.DateField(
        null=True, default=date.today().strftime("%Y-%m-%d"))
    caseNote = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'cases'


class Team(models.Model):
    team_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    case = models.ForeignKey(Cases, on_delete=models.CASCADE, null=True)
    date_created = models.DateField(default=date.today().strftime("%Y-%m-%d"))

    class Meta:
        db_table = 'teams'


class Witness(models.Model):
    wit_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    case = models.ForeignKey(Cases, on_delete=models.CASCADE, null=True)
    witnessFullName = models.CharField(max_length=255)
    witnessAge = models.PositiveSmallIntegerField(null=True, blank=True)
    witnessGender = models.CharField(max_length=20, null=True)
    witnessAddress = models.TextField()
    witnessPhone = models.CharField(max_length=20)

    class Meta:
        db_table = 'witness'


class Victims(models.Model):
    vict_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    case = models.ForeignKey(Cases, on_delete=models.CASCADE, null=True)
    victim_name = models.CharField(max_length=100)
    victim_age = models.PositiveSmallIntegerField(null=True, blank=True)
    victim_gender = models.CharField(max_length=20, null=True)
    victim_address = models.TextField()
    victim_injuries = models.TextField(null=True)
    victim_medicalInfo = models.TextField(null=True)
    victim_phone = models.CharField(max_length=20)
    victim_notes = models.TextField(),

    class Meta:
        db_table = 'victims'


class Suspect(models.Model):
    suspect_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    suspectFullName = models.CharField(max_length=100)
    suspectAge = models.PositiveSmallIntegerField(null=True, blank=True)
    case = models.ForeignKey(Cases, on_delete=models.CASCADE, null=True)
    suspectGender = models.CharField(max_length=20)
    suspectAddress = models.TextField()
    suspectPhone = models.CharField(max_length=20)
    suspectRelationship = models.CharField(max_length=255, null=True)
    suspectNotes = models.TextField(null=True)
    verdict_id = models.ForeignKey(
        'Verdict', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'suspect'


class ActivityLog(models.Model):
    log_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    activity_type = models.CharField(max_length=255)
    activity_time = models.DateTimeField()
    officer = models.ForeignKey(officer, on_delete=models.CASCADE, null=True)
    is_login_attempt = models.BooleanField(default=False)
    is_login_success = models.BooleanField(default=False)

    class Meta:
        db_table = 'activity_log'


class Evidences(models.Model):
    evidence_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE, null=True)
    date_added = models.DateField(default=date.today().strftime("%Y-%m-%d"))
    evidence_type = models.CharField(max_length=255, default="Image")
    evidence_data = models.FileField(
        upload_to='evidences/', storage=CustomStorage())

    class Meta:
        db_table = 'evidences'


class Civilian(models.Model):
    civilian_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)

    class Meta:
        db_table = 'civilians'


class Complaints(models.Model):
    complaint_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    civilian = models.ForeignKey(
        'Civilian', on_delete=models.CASCADE, null=True)
    complaint_type = models.CharField(max_length=255, null=True)
    complaint_date = models.DateField(
        default=date.today().strftime("%Y-%m-%d"))
    complaint_text = models.TextField(null=True)
    incident_location = models.CharField(max_length=255)
    complaint_status = models.CharField(
        max_length=255, default="Pending", null=True)

    class Meta:
        db_table = 'complaints'


class FIR(models.Model):
    FIR_ID = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    summary_of_interview = models.TextField(null=True)
    additional_contacts_witnesses = models.TextField(null=True)
    incident_location_detail = models.TextField(null=True)
    officer_remark = models.TextField(null=True)
    evidence = models.ForeignKey(
        Evidences, on_delete=models.CASCADE, null=True)
    officer = models.ForeignKey(officer, on_delete=models.CASCADE, null=True)
    civilian = models.ForeignKey(Civilian, on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = 'FIR'


class Post(models.Model):
    post_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    officer = models.ForeignKey(officer, on_delete=models.CASCADE, null=True)
    post_date = models.DateField(
        default=date.today().strftime("%Y-%m-%d"), null=True)
    person_name = models.CharField(max_length=100, null=True)
    person_age = models.PositiveSmallIntegerField(null=True, blank=True)
    person_sex = models.CharField(max_length=100, null=True)
    person_physical_description = models.TextField(null=True)
    person_distinguishing_features = models.TextField(null=True)
    contact_information = models.CharField(max_length=250, null=True)

    class Meta:
        db_table = 'post'


class Crime(models.Model):
    crime_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    suspect = models.ForeignKey('Suspect', on_delete=models.CASCADE, null=True)
    date = models.DateField()
    location = models.CharField(max_length=255)
    type_of_crime = models.CharField(max_length=255)
    description = models.TextField()

    class Meta:
        db_table = 'crime'


class Warrant(models.Model):
    warrant_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE, null=True)
    suspect_id = models.ForeignKey(
        Suspect, on_delete=models.CASCADE, null=True)
    warrant_type = models.CharField(max_length=50)
    issued_date = models.DateTimeField(default=timezone.now)
    issued_by = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        db_table = 'warrant'


class Verdict(models.Model):
    verdict_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE, null=True)
    verdict_type = models.CharField(max_length=50)
    verdict_date = models.DateField(
        default=date.today().strftime("%Y-%m-%d"))
    verdict_description = models.TextField()

    class Meta:
        db_table = 'verdict'


class Report(models.Model):
    report_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False)
    officer = models.ForeignKey(officer, on_delete=models.CASCADE, null=True)
    report_type = models.CharField(max_length=60)
    report_date = models.DateField(
        default=date.today().strftime("%Y-%m-%d"))
    report_body = models.TextField()
