from django.urls import path

from core.views import HomePageView, PostDetailView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    #path('<int:post_id>', PostDetailView.as_view(), name='post_detail')
]
