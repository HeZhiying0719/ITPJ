from Demos.win32ts_logoff_disconnected import username
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import CreateView, TemplateView
from customer.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView
from users.forms import CustomerRegistrationForm
from users.models import CustomUser
from users.views import BaseUserLoginView
from core.models import Post
from customer.forms import PostCreationForm

class LoginView(BaseUserLoginView):
    success_url = reverse_lazy('customer_dashboard')
    user_type = CustomUser.Type.CUSTOMER

class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'customers/dashboard.html'

class PostingView(LoginRequiredMixin, CreateView):
    model = Post
    form_class = PostCreationForm
    template_name = 'customers/posting.html'
    success_url = reverse_lazy("customer_dashboard")

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)