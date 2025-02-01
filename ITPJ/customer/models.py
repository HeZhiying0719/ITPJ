from django.db import models
from django.conf import settings

from core.models import Blog
from users.models import CustomUser

#User Profile (Including Avatar)
class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_profile'
    )

    avatar = models.ImageField(upload_to='media/avatars', null=True, blank=True)

    introduction = models.TextField(null=True, blank=True)



class Favicon(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user'
    )
    blog_id = models.ForeignKey(
        Blog, on_delete=models.CASCADE, related_name='blog'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)