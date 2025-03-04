import logging
from msilib.schema import ListView

from django.views.generic import TemplateView



logger = logging.getLogger(__name__)


class HomePageView(TemplateView):
    template_name = 'core/homepage.html'

# class PostReadingView(ListView):
#     template_name = ''
#


