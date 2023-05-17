# Generated by Django 2.1.15 on 2023-05-17 11:07

import backend.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_auto_20230516_0859'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='evidences',
            name='description',
        ),
        migrations.AlterField(
            model_name='evidences',
            name='evidence_data',
            field=models.FileField(storage=backend.models.CustomStorage(), upload_to='evidences/'),
        ),
        migrations.AlterField(
            model_name='officer',
            name='created_at',
            field=models.DateField(default='2023-05-17', null=True),
        ),
    ]
