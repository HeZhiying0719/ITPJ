# Generated by Django 5.1.5 on 2025-02-04 23:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_blog_category1_remove_blog_category2_and_more'),
        ('customer', '0005_userprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favicon',
            name='post_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post', to='core.post'),
        ),
    ]
