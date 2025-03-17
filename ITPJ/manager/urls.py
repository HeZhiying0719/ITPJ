from django.urls import path
from manager import views

app_name = 'manager'

# from customer.views import (
#     LoginView, DashboardView
# )

from manager.views import ManagerLoginView, ManagerDashboardView



urlpatterns = [
    # path('', ManagerView.as_view(), name='manager_dashboard'),
    # 13/3
    path('login/', ManagerLoginView.as_view(), name='manager_login'),
    # path('login/', views.manager_dashboard, name='manager_dashboard'),
    path('dashboard/', ManagerDashboardView.as_view(), name='manager_dashboard'),
    # path('', views.manage_post, name='manager_dashboard'),
    path('posts/', views.manage_post, name='manage_posts'),
    path('users/', views.manage_user, name='manage_users'),
    path('', views.manage_aboutus, name='manage_aboutus'),
    path('categories/', views.manage_categories, name='manage_categories'),
    # path('categories/edit/', views.edit_category, name='edit_category'),
    path('categories/delete/<str:auditing_category_name>/', views.delete_category, name='delete_category'),
    path('post-info/<str:auditing_post_id>/', views.post_details, name='post_details'),
    path('post-delete/<str:auditing_post_id>/', views.delete_post, name='post_delete'),
    path('post-approve/<str:auditing_post_id>/', views.approve_post, name='post_approve'),
    
]
