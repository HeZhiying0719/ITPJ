from django.urls import path
from manager import views

# app_name = 'manager'

# from customer.views import (
#     LoginView, DashboardView
# )

from manager.views import ManagerLoginView, ManagerDashboardView

urlpatterns = [
    # path('login/', LoginView.as_view(), name='customer_login'),
    # path('', ManagerView.as_view(), name='manager_dashboard'),
    path('login/', ManagerLoginView.as_view(), name='manager_login'),
    path('', ManagerDashboardView.as_view(), name='manager_dashboard'),
    path('posts/', views.manage_post, name='manage_posts'),
    path('users/', views.manage_user, name='manage_users'),

]
