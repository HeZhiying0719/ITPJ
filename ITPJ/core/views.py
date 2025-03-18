from django.http import JsonResponse
from django.shortcuts import redirect, get_object_or_404
from django.views.generic import TemplateView, DetailView
from django.views import View
from django.db.models import Q, F
from core.models import Post, Category

class HomePageView(TemplateView):
    template_name = 'core/homepage.html'


    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(post_status=2)).order_by('-created_at')
        # # need some sql or if-then to select posts to show
        # # need some sql or if-then to select posts to show
        #
        # context['posts'] = Post.objects.filter(post_status=2).annotate(
        #     score=hot_score(F('like_num'), F('page_views'), F('created_at'))
        # ).order_by('-score')
        return context


class HomePageEquipmentView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=1)&Q(post_status=2)).order_by('-created_at')
        return context

class HomeLandscapeView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=2)&Q(post_status=2)).order_by('-created_at')
        return context

class HomeNatureView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=3)&Q(post_status=2)).order_by('-created_at')
        return context


class HomeStreetView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=4)&Q(post_status=2)).order_by('-created_at')
        return context


class HomeTravelView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=5)&Q(post_status=2)).order_by('-created_at')
        return context


class HomeLifestyleView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=6)&Q(post_status=2)).order_by('-created_at')
        return context


class HomeCreativeView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=7)&Q(post_status=2)).order_by('-created_at')
        return context


class HomeObjectView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=8)&Q(post_status=2)).order_by('-created_at')
        return context


class HomePortraitureView(TemplateView):
    template_name = 'core/homepage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(Q(category=9)&Q(post_status=2)).order_by('-created_at')
        return context


class AboutUsView(TemplateView):
    template_name = 'core/about-us.html'





