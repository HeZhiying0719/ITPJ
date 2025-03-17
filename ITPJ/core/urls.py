from django.urls import path
from win32ui import CreateView

from core.views import *


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('equipment/', HomePageEquipmentView.as_view(), name='equipment'),
    path('landscape/', HomeLandscapeView.as_view(), name='landscape'),
    path('nature/', HomeNatureView.as_view(), name='nature'),
    path('street/', HomeStreetView.as_view(), name='street'),
    path('travel/', HomeTravelView.as_view(), name='travel'),
    path('lifestyle/', HomeLifestyleView.as_view(), name='lifestyle'),
    path('creative/', HomeCreativeView.as_view(), name='creative'),
    path('object/', HomeObjectView.as_view(), name='object'),
    path('portraiture/', HomePortraitureView.as_view(), name='portraiture'),
    path('aboutus/', AboutUsView.as_view(), name='aboutus')

]
