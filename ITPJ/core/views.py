import logging

from django.http import JsonResponse
from django.shortcuts import redirect, get_object_or_404
from django.views.generic import TemplateView, DetailView
from django.views import View
from core.models import Post

logger = logging.getLogger(__name__)


class HomePageView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.all().order_by('-created_at')
        # need some sql or if-then to select posts to show
        return context




class PostDetailView(DetailView):
    model = Post
    template_name = 'core/postdetail.html'  # 详情页的模板
    context_object_name = 'post'



