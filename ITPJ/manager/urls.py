from django.urls import path
from manager import views

app_name = 'manager'

# from customer.views import (
#     LoginView, DashboardView
# )

from manager.views import ManagerLoginView, ManagerDashboardView
from manager.views import ManagerLoginView



urlpatterns = [
    # path('', ManagerView.as_view(), name='manager_dashboard'),
    # 13/3
    path('login/', ManagerLoginView.as_view(), name='manager_login'),
    # path('login/', views.manager_dashboard, name='manager_dashboard'),
    path('dashboard/', ManagerDashboardView.as_view(), name='manager_dashboard'),
    # path('', views.manage_post, name='manager_dashboard'),
    path('posts/', views.manage_post, name='manage_posts'),
    path('users/', views.manage_user, name='manage_users'),
]
