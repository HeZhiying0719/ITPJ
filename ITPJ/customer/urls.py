from django.urls import path

from customer.views import (
    LoginView, DashboardView
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='customer_login'),
    path('', DashboardView.as_view(), name='customer_dashboard'),

]
