from django.urls import path

from customer.views import (
    LoginView, DashboardView, PostingView
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='customer_login'),
    path('', DashboardView.as_view(), name='customer_dashboard'),
    path('posting/', PostingView.as_view(), name='customer_posting_view')

]
