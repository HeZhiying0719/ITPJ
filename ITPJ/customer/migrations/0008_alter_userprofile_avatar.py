# Generated by Django 4.2.2 on 2025-03-13 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0007_delete_favicon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='avatars/'),
        ),
    ]
