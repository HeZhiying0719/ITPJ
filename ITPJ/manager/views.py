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

from core.models import Category, Post, PostStatus


class ManagerLoginView(BaseUserLoginView):
    success_url = reverse_lazy('manager:manager_dashboard')
    user_type = CustomUser.Type.MANAGER
    
class ManagerDashboardView(LoginRequiredMixin, TemplateView):
    template_name = "managers/about-us.html"
    

def manage_post(request):
    context_dict = {}
    #15/3
    #防止没有Category，Post
    try:
        category_list = Category.objects.all()
        categories = [category.name for category in category_list]
        context_dict['categories'] = categories  
    except Category.DoesNotExist:
        context_dict['categories'] = None 
               
    try:
        #获取所有审核状态下的帖子
        post_list = Post.objects.filter(post_status__status = PostStatus.Status.AUDITING)
        context_dict['posts'] = post_list
    
    except Post.DoesNotExist:
        context_dict['posts'] = None
    
    return render(request, 'managers/manager_posts.html', context=context_dict)

def manage_user(request):
    context_dict = {}
    #15/3
    #users i.e. customers
    
    return render(request, 'managers/manager_users.html', context=context_dict)

def manage_aboutus(request):
    context_dict = {}
    return render(request, 'managers/about-us.html', context=context_dict)

def post_details(request, auditing_post_id):
    #初设定：按照id导航至对应页面的详情
    context_dict = {}
    # post_id = request.POST.get('post_id')
    # context_dict['post_id'] = post_id
    try:
        post = Post.objects.get(post_id=auditing_post_id)
        context_dict['post'] = post
    except Post.DoesNotExist:
        context_dict['post'] = None
    
    return render(request, 'managers/post_info.html', context=context_dict)
    
