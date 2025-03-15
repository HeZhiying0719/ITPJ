from django.urls import path
from django.conf.urls.static import static

from django.conf import settings
from customer.views import (
    LoginView, DashboardView, PostingView, MyPostsView,PostDetailView
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='customer_login'),
    path('', DashboardView.as_view(), name='customer_dashboard'),
    path('posting/', PostingView.as_view(), name='customer_posting_view'),
    path('myposts/', MyPostsView.as_view(), name='my_posts'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post_detail'),

]
