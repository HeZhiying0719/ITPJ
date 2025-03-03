from django.urls import path

from users.views import (
    CustomerRegisterView,
    BaseUserLoginView,
    BaseLogoutView,
)

urlpatterns = [
    path('register/', CustomerRegisterView.as_view(), name='customer_register'),
    path('login/', BaseUserLoginView.as_view(), name='customer_login'),
    path('logout/', BaseLogoutView.as_view(), name='customer_logout'),
]
