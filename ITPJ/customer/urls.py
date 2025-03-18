from django.urls import path
from django.conf.urls.static import static

from django.conf import settings
from customer.views import (
    LoginView, DashboardView, PostingView, MyPostsView, PostDetailView, UpdateProfileView, PostDeleteView,
    PostReportView, PostLikeView, LikedPostsView

)

urlpatterns = [
    path('login/', LoginView.as_view(), name='customer_login'),
    path('<int:pk>', DashboardView.as_view(), name='customer_dashboard'),
    path('posting/', PostingView.as_view(), name='customer_posting_view'),
    path('myposts/', MyPostsView.as_view(), name='my_posts'),
    path('likedposts/', LikedPostsView.as_view(), name='liked_posts'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post_detail'),
    path('update/<int:pk>/', UpdateProfileView.as_view(), name='change_profile'),
    path('delete/<str:pk>/', PostDeleteView.as_view(), name='delete_post'),

    path('report/<str:pk>/', PostReportView.as_view(), name='report_post'),
    path('like/<str:pk>/', PostLikeView.as_view(), name='like_post'),


]
