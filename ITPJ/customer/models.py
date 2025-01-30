from django.db import models

class Blog(models.Model):
    blog_id = models.IntegerField(max_length=15, unique=True, primary_key=True)
    intent = models.TextField
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    type = models.CharField(max_length=20)
