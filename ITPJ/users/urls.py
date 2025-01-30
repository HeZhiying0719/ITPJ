from django.urls import path

from users.views import (
    CustomerRegisterView,
    BaseLogoutView,
)

urlpatterns = [
    path('register/', CustomerRegisterView.as_view(), name='customer_register'),
    path('logout/', BaseLogoutView.as_view(), name='customer_logout'),
]
