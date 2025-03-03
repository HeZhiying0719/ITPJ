from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import CreateView, TemplateView
from customer.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView
from users.forms import CustomerRegistrationForm
from users.models import CustomUser
from users.views import BaseUserLoginView

class LoginView(BaseUserLoginView):
    success_url = reverse_lazy('customer_dashboard')
    user_type = CustomUser.Type.CUSTOMER

class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'customers/dashboard.html'
