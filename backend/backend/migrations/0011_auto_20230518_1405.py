# Generated by Django 2.1.15 on 2023-05-18 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_auto_20230518_1214'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='date_created',
            field=models.DateField(default='2023-05-18'),
        ),
    ]