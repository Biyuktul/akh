# Generated by Django 2.1.15 on 2023-05-18 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_auto_20230518_1405'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cases',
            old_name='case_created_date',
            new_name='caseDate',
        ),
        migrations.RenameField(
            model_name='cases',
            old_name='case_priority',
            new_name='casePriority',
        ),
        migrations.RenameField(
            model_name='cases',
            old_name='case_type',
            new_name='caseType',
        ),
        migrations.RemoveField(
            model_name='cases',
            name='date_updated',
        ),
        migrations.RemoveField(
            model_name='suspect',
            name='suspect_description',
        ),
        migrations.AlterField(
            model_name='cases',
            name='case_status',
            field=models.CharField(default='Open', max_length=255, null=True),
        ),
    ]
