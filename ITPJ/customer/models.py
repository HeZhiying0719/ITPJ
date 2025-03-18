from django.db import models
from django.conf import settings

from core.models import Post
from users.models import CustomUser


#User Profile (Including Avatar)
class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_profile'
    )

    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, default="/static/img/default-user.png")

    introduction = models.TextField(null=True, blank=True, default="no introduction yet")


# @receiver(post_save, sender=CustomUser)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)
#
# @receiver(post_save, sender=CustomUser)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()
