import logging

from django.shortcuts import redirect
from django.views.generic import TemplateView
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


class PostDetailView(View):
    #template_name = 'core/post_detail.html'

    def post(self, request, post_id: int):
        return redirect('post_detail', pk=Post.post_id)



