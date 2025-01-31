from django.db import models
from django.conf import settings
import random

class Category(models.Model):
    category_id = models.IntegerField(unique=True, primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Blog(models.Model):
    blog_id = models.CharField(max_length=6, unique=True, primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.SET_NULL,
        related_name='bloger',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.TextField(max_length=100, null=False, blank=False)
    content = models.TextField(max_length=500, null=False, blank=True)

    category1 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category1')
    category2 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category2', blank=True)
    category3 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category3', blank=True)
    category4 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category4', blank=True)
    category5 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category5', blank=True)

    def __generate_unique_id(self):
        while True:
            blog_id = str(random.randint(100000, 999999))
            if not Blog.objects.filter(blog_id=blog_id).exists():
                return blog_id
