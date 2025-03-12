from logging import Manager
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.shortcuts import render
from django.http import HttpResponse


from manager.mixins import LoginRequiredMixin
from users.views import BaseUserLoginView
from users.forms import CustomerRegistrationForm
from users.models import CustomUser
from django.views.generic import CreateView, TemplateView

from django.shortcuts import render
from django.views.generic import CreateView


class ManagerLoginView(BaseUserLoginView):
    success_url = reverse_lazy('manager_dashboard')
    user_type = CustomUser.Type.MANAGER
    
    
class ManagerDashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'managers/manager_posts.html'

def manage_post(request):
    context_dict = {}
    return render(request, 'managers/manager_posts.html', context=context_dict)

def manage_user(request):
    context_dict = {}
    return render(request, 'managers/manager_users.html', context=context_dict)
    
# class PostInfoView(LoginRequiredMixin, CreateView):
#     model = Post
    

