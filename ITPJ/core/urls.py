from django.urls import path

from core.views import HomePageView, PostDetailView, HomePageEquipmentView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post_detail'),
    path('equipment/', HomePageEquipmentView.as_view(), name='equipment'),


]
