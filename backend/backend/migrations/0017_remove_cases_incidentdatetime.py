# Generated by Django 2.1.15 on 2023-05-18 16:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_auto_20230518_1503'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cases',
            name='incidentDateTime',
        ),
    ]