# Generated by Django 2.1.15 on 2023-05-18 12:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_remove_cases_team_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cases',
            old_name='case_description',
            new_name='caseDescription',
        ),
        migrations.RenameField(
            model_name='cases',
            old_name='case_note',
            new_name='caseNote',
        ),
        migrations.RenameField(
            model_name='cases',
            old_name='case_status',
            new_name='caseStatus',
        ),
        migrations.RenameField(
            model_name='cases',
            old_name='incident_date',
            new_name='incidentDateTime',
        ),
        migrations.RenameField(
            model_name='victims',
            old_name='address',
            new_name='victim_address',
        ),
        migrations.RenameField(
            model_name='victims',
            old_name='age',
            new_name='victim_age',
        ),
        migrations.RenameField(
            model_name='victims',
            old_name='gender',
            new_name='victim_gender',
        ),
        migrations.RenameField(
            model_name='victims',
            old_name='injuries',
            new_name='victim_injuries',
        ),
        migrations.RenameField(
            model_name='victims',
            old_name='medical_information',
            new_name='victim_medicalInfo',
        ),
        migrations.RenameField(
            model_name='victims',
            old_name='name',
            new_name='victim_name',
        ),
        migrations.RenameField(
            model_name='victims',
            old_name='phone',
            new_name='victim_phone',
        ),
    ]
