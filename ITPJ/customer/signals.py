from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import CustomUser
from customer.models import UserProfile

@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):

    if created:
        UserProfile.objects.create(user=instance)
