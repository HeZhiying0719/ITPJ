import logging

from django.views.generic import TemplateView



logger = logging.getLogger(__name__)


class HomePageView(TemplateView):
    template_name = 'core/homepage.html'

