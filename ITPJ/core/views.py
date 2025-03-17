import logging

from django.http import JsonResponse
from django.shortcuts import redirect, get_object_or_404
from django.views.generic import TemplateView, DetailView
from django.views import View
from sympy.integrals.meijerint_doc import category
from django.db.models import Q
from core.models import Post, Category

logger = logging.getLogger(__name__)


class HomePageView(TemplateView):
    template_name = 'core/homepage.html'


    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(post_status=2)).order_by('-created_at')
        # need some sql or if-then to select posts to show
        # need some sql or if-then to select posts to show

        # context['posts'] = Post.objects.filter(status='published').annotate(
        #     score=F('likes') - F('dislikes')  # 计算得分
        # ).order_by('-score', '-created_at')  # 先按得分降序，再按发布时间降序
        return context


class HomePageEquipmentView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=1)).order_by('-created_at')
        return context

class HomeLandscapeView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=2)).order_by('-created_at')
        return context

class HomeNatureView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=3)).order_by('-created_at')
        return context


class HomeStreetView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=4)).order_by('-created_at')
        return context


class HomeTravelView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=5)).order_by('-created_at')
        return context


class HomeLifestyleView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=6)).order_by('-created_at')
        return context


class HomeCreativeView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=7)).order_by('-created_at')
        return context


class HomeObjectView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=8)).order_by('-created_at')
        return context


class HomePortraitureView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=9)).order_by('-created_at')
        return context


class AboutUsView(TemplateView):
    template_name = 'core/about-us.html'





