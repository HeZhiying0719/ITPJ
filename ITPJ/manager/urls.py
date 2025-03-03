from django.urls import path

# from customer.views import (
#     LoginView, DashboardView
# )

from manager.views import ManagerView

urlpatterns = [
    # path('login/', LoginView.as_view(), name='customer_login'),
    path('', ManagerView.as_view(), name='manager_dashboard'),

]
