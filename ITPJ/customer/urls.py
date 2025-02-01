from django.urls import path

from customer.views import CustomerHomePageView

urlpatterns = [
    path('<int:user_id>/homepage/', CustomerHomePageView.as_view(), name='customer_homepage'),

]
