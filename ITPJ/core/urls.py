from django.urls import path

from core.views import HomePageView, HomePageEquipmentView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('equipment/', HomePageEquipmentView.as_view(), name='equipment'),


]
