from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    class Type(models.TextChoices):
        CUSTOMER = ('customer', _('Customer'))
        MANAGER = ('manager', _('Manager'))

    type = models.CharField(max_length=20, choices=Type.choices)

    def __str__(self):
        return self.username
