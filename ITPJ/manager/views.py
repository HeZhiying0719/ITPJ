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

from django.shortcuts import render, redirect
from django.db.models import Max
from django.views.generic import CreateView

from core.models import Category, Post, PostStatus

#16/3
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class ManagerLoginView(BaseUserLoginView):
    success_url = reverse_lazy('manager:manager_dashboard')
    user_type = CustomUser.Type.MANAGER
    
class ManagerDashboardView(LoginRequiredMixin, TemplateView):
    template_name = "managers/about-us.html"
    
#Post Management page
def manage_post(request):
    context_dict = {}
    #15/3
    #防止没有Category，Post
    try:
        category_list = Category.objects.all()
        categories = [category for category in category_list]
        context_dict['categories'] = categories  
    except Category.DoesNotExist:
        context_dict['categories'] = None 
               
    try:
        #获取所有审核状态下的帖子
        post_list = Post.objects.filter(post_status__status = PostStatus.Status.AUDITING)
        #目前方便测试翻页功能设定为一页有2个帖子
        paginator = Paginator(post_list, 2)
        page = request.GET.get('page')
        #16/3
        # 
        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)
        context_dict['posts'] = posts
        context_dict['paginator'] = paginator
    
    except Post.DoesNotExist:
        context_dict['posts'] = None
    
    return render(request, 'managers/manager_posts.html', context=context_dict)

# Category Management Functions
def manage_categories(request):
    if request.method == 'POST':
        category_name = request.POST.get('categoryName', '').strip()
        if category_name:
            # 自动生成 category_id：假设按最大值+1
            max_id = Category.objects.aggregate(Max('category_id'))['category_id__max'] or 0
            new_id = max_id + 1
            Category.objects.create(category_id=new_id, name=category_name)
        return redirect('/manager/posts')
    
    # GET 请求，查询所有分类
    categories = Category.objects.all()
    return render(request, 'managers/manager_posts.html', {'categories': categories})

def edit_category(request):
    # 处理“编辑分类”的 POST 请求
    if request.method == 'POST':
        cat_id = request.POST.get('category_id')
        cat_name = request.POST.get('category_name', '').strip()
        try:
            cat = Category.objects.get(pk=cat_id)
            cat.name = cat_name
            cat.save()
        except Category.DoesNotExist:
            pass
    return redirect('manager:manage_categories')


def delete_category(request):
    # 处理“删除分类”的 GET 请求
    cat_id = request.GET.get('cat_id')
    try:
        cat = Category.objects.get(pk=cat_id)
        cat.delete()
    except Category.DoesNotExist:
        pass
    return redirect('manager:manage_categories')

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
    
    post = Post.objects.get(post_id=auditing_post_id)
    context_dict['post'] = post
    
    return render(request, 'managers/post_info.html', context=context_dict)
    
def delete_post(request, auditing_post_id):
    return redirect('manager:manage_posts')

def approve_post(request, auditing_post_id):
    return redirect('manager:manage_posts')