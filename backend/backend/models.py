from django.db import models
from django.utils import timezone
import shortuuid


class officer(models.Model):
    o_id = models.CharField(
        max_length=22, primary_key=True, default=shortuuid.uuid)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    logon_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)
    rank = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='officer_photos/')

    class Meta:
        app_label = 'backend'


class Cases(models.Model):
    case_id = models.AutoField(primary_key=True)
    case_type = models.CharField(max_length=255)
    case_description = models.TextField()
    case_created_date = models.DateField()
    date_updated = models.DateField()
    team_id = models.ForeignKey('Team', on_delete=models.CASCADE)


class Team(models.Model):
    team_id = models.AutoField(primary_key=True)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    date_created = models.DateField()


class Complaints(models.Model):
    comp_id = models.AutoField(primary_key=True)
    civilian_id = models.ForeignKey('Civilian', on_delete=models.CASCADE)
    date = models.DateField()
    description = models.TextField()
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=255)


class Criminals(models.Model):
    criminal_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    DOB = models.DateField()
    gender = models.CharField(max_length=10)
    crime_type = models.CharField(max_length=255)
    description = models.TextField()


class Civilian(models.Model):
    civilian_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)


class Privileges(models.Model):
    privilege_id = models.AutoField(primary_key=True)
    o_id = models.ForeignKey(officer, on_delete=models.CASCADE)
    privilege_name = models.CharField(max_length=255)


class ActivityLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    activity_type = models.CharField(max_length=255)
    activity_time = models.DateTimeField()
    o_id = models.ForeignKey(officer, on_delete=models.CASCADE)


class Evidences(models.Model):
    evidence_id = models.AutoField(primary_key=True)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    description = models.TextField()
    date_added = models.DateField()
    evidence_type = models.CharField(max_length=255)
    evidence_data = models.FileField(upload_to='evidences/')


class Witness(models.Model):
    wit_id = models.AutoField(primary_key=True)
    FIR_ID = models.ForeignKey('FIR', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)


class Victims(models.Model):
    vict_id = models.AutoField(primary_key=True)
    FIR_ID = models.ForeignKey('FIR', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)


class FIR(models.Model):
    FIR_ID = models.AutoField(primary_key=True)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    o_id = models.ForeignKey(officer, on_delete=models.CASCADE)


class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    o_id = models.ForeignKey(officer, on_delete=models.CASCADE)
    post_type = models.CharField(max_length=50)
    post_date = models.DateTimeField(default=timezone.now)
    post_description = models.TextField()
    post_update_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.post_type


class Suspect(models.Model):
    suspect_id = models.AutoField(primary_key=True)
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


class Warrant(models.Model):
    warrant_id = models.AutoField(primary_key=True)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    suspect_id = models.ForeignKey(Suspect, on_delete=models.CASCADE)
    warrant_type = models.CharField(max_length=50)
    issued_date = models.DateTimeField(default=timezone.now)
    issued_by = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.warrant_type


class Verdict(models.Model):
    verdict_id = models.AutoField(primary_key=True)
    case_id = models.ForeignKey(Cases, on_delete=models.CASCADE)
    verdict_type = models.CharField(max_length=50)
    verdict_date = models.DateTimeField(default=timezone.now)
    verdict_description = models.TextField()

    def __str__(self):
        return self.verdict_type
