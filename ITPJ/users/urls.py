from django.urls import path

from users.views import (
    CustomerRegisterView,
    BaseUserLoginView,
    BaseLogoutView,
)

urlpatterns = [
    path('register/', CustomerRegisterView.as_view(), name='customer_register'),
    # path('login/', BaseUserLoginView.as_view(), name='customer_login'),
    path('login/', BaseUserLoginView.as_view(), name='user_login'),
    path('logout/', BaseLogoutView.as_view(), name='customer_logout'),
    path('mlogin/', BaseUserLoginView.as_view(), name='manager_login'),
    path('mlogout/', BaseLogoutView.as_view(), name='manager_logout'),
    
]
