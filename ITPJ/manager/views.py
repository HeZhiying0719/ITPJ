from logging import Manager
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _


from users.forms import CustomerRegistrationForm
from users.models import CustomUser

from django.shortcuts import render
from django.views.generic import CreateView


# Create your views here.
class ManagerView(CreateView):
    success_url = reverse_lazy('manager_homepage')
