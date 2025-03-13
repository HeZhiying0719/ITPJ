import logging

from django.http import JsonResponse
from django.shortcuts import redirect, get_object_or_404
from django.views.generic import TemplateView, DetailView
from django.views import View
from sympy.integrals.meijerint_doc import category
from django.db.models import Q
from core.models import Post

logger = logging.getLogger(__name__)


class HomePageView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.all().order_by('-created_at')
        # need some sql or if-then to select posts to show
        return context

class HomePageEquipmentView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category1=1)|Q(category2=1)|Q(category3=1)|Q(category4=1)|Q(category5=1)).order_by('-created_at')
        # need some sql or if-then to select posts to show

        # context['posts'] = Post.objects.filter(status='published').annotate(
        #     score=F('likes') - F('dislikes')  # 计算得分
        # ).order_by('-score', '-created_at')  # 先按得分降序，再按发布时间降序
        return context
#
# class HomePageView(TemplateView):
#     template_name = 'core/homepage.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['posts'] = Post.objects.all().order_by('-created_at')
#         # need some sql or if-then to select posts to show
#         return context
#
# class HomePageView(TemplateView):
#     template_name = 'core/homepage.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['posts'] = Post.objects.all().order_by('-created_at')
#         # need some sql or if-then to select posts to show
#         return context
#
#



class PostDetailView(DetailView):
    model = Post
    template_name = 'core/postdetail.html'  # 详情页的模板
    context_object_name = 'post'



