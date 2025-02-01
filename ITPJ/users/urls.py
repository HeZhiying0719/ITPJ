from django.urls import path

from users.views import (
    CustomerRegisterView,
    BaseLogoutView,
)

urlpatterns = [
    path('register/', CustomerRegisterView.as_view(), name='customer_register'),
    path('login/', CustomerRegisterView.as_view(), name='customer_login'),
    path('logout/', BaseLogoutView.as_view(), name='customer_logout'),
]
