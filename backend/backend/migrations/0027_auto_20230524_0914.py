# Generated by Django 2.1.15 on 2023-05-24 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0026_auto_20230523_1729'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='post_description',
        ),
        migrations.RemoveField(
            model_name='post',
            name='post_type',
        ),
        migrations.RemoveField(
            model_name='post',
            name='post_update_date',
        ),
        migrations.AddField(
            model_name='post',
            name='contact_information',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='person_age',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='person_distinguishing_features',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='person_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='person_physical_description',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='person_sex',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='cases',
            name='caseDate',
            field=models.DateField(default='2023-05-24', null=True),
        ),
        migrations.AlterField(
            model_name='complaints',
            name='complaint_date',
            field=models.DateField(default='2023-05-24'),
        ),
        migrations.AlterField(
            model_name='evidences',
            name='date_added',
            field=models.DateField(default='2023-05-24'),
        ),
        migrations.AlterField(
            model_name='officer',
            name='created_at',
            field=models.DateField(default='2023-05-24', null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='post_date',
            field=models.DateTimeField(default='2023-05-24', null=True),
        ),
        migrations.AlterField(
            model_name='report',
            name='report_date',
            field=models.DateField(default='2023-05-24'),
        ),
        migrations.AlterField(
            model_name='team',
            name='date_created',
            field=models.DateField(default='2023-05-24'),
        ),
        migrations.AlterField(
            model_name='verdict',
            name='verdict_date',
            field=models.DateField(default='2023-05-24'),
        ),
    ]