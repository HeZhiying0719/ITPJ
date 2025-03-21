from logging import Manager
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.http import HttpResponse


from manager.mixins import LoginRequiredMixin
from users.views import BaseUserLoginView
from users.forms import CustomerRegistrationForm
from users.models import CustomUser
from django.views.generic import CreateView, TemplateView

from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Max
from django.views.generic import CreateView

from core.models import Category, Post, PostStatus
from users.models import CustomUser

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
        #目前方便测试翻页功能设定为一页有2个帖子,之后更换为4个为最好
        paginator = Paginator(post_list, 4)
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


def delete_category(request, auditing_category_name):
    # 处理“删除分类”的 GET 请求
    # cat_id = request.GET.get('cat_id')
    # try:
    #     cat = Category.objects.get(pk=cat_id)
    #     cat.delete()
    # except Category.DoesNotExist:
    #     pass
    print(f"Trying to delete category with name : {auditing_category_name}")
    
    category = get_object_or_404(Category, name = str(auditing_category_name))
    category.delete()
    
    return redirect('manager:manage_posts')

def manage_user(request):
    context_dict = {}
    #15/3
    #users i.e. customers
    #16/3
    try:
        user_list = CustomUser.objects.all()
        #4 or 5 
        paginator = Paginator(user_list, 5)
        page = request.GET.get('page')
        try:
            users = paginator.page(page)
        except PageNotAnInteger:
            users = paginator.page(1)
        except EmptyPage:
            users = paginator.page(paginator.num_pages)
        context_dict['users'] = users
        context_dict['paginator'] = paginator
    except CustomUser.DoesNotExist:
        context_dict['users'] = None
        
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
    
    
    #17/3
def delete_post(request, auditing_post_id):
    print(f"Trying to delete post with ID : {auditing_post_id}")
    
    post = get_object_or_404(Post, post_id = str(auditing_post_id))
    post.delete()
    
    return redirect('manager:manage_posts')

    #17/3
def approve_post(request, auditing_post_id):
    print(f"Trying to approve post with ID : {auditing_post_id}")
    
    post = get_object_or_404(Post, post_id = str(auditing_post_id))
    post.post_status = PostStatus.objects.get(status=PostStatus.Status.OKEY)
    post.save()
    
    return redirect('manager:manage_posts')


def upgrade_user(request, upgrade_user_id):
    
    print(f"Tring to upgrade user with id: {upgrade_user_id}")
    user = get_object_or_404(CustomUser, id = upgrade_user_id)
    if(user.type == 'manager'):
        user.type = 'customer'
    else:
        user.type = 'manager'
    user.save()
    
    return redirect('manager:manage_users')


def delete_user(request, delete_user_id):
    
    print(f"Tring to delete user with id: {delete_user_id}")
    user = get_object_or_404(CustomUser, id = delete_user_id)
    post_list = Post.objects.all()
    for post in post_list:
        if post.user.id == delete_user_id:
            post.delete()
    
    user.delete()
    
    return redirect('manager:manage_users')