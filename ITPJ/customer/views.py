from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse_lazy, reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import CreateView, TemplateView, UpdateView, DeleteView
from tensorboard.plugins.audio.summary import audio
from customer.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView
from users.forms import CustomerRegistrationForm
from users.models import CustomUser
from users.views import BaseUserLoginView
from core.models import Post, PostStatus
from customer.forms import PostCreationForm, CommentCreationForm, ProfileForm
from customer.models import UserProfile
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

class LoginView(BaseUserLoginView):
    # success_url = reverse_lazy('customer_dashboard', kwargs={"pk": self.request.user.pk})
    user_type = CustomUser.Type.CUSTOMER

    def get_success_url(self):
        if self.request.user.is_authenticated:
            return reverse("customer_dashboard", kwargs={"pk": self.request.user.pk})
        return reverse_lazy("home")

class DashboardView(LoginRequiredMixin, DetailView):
    model = CustomUser
    template_name = 'customers/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_profile'] = self.request.user.user_profile
        return context


class UpdateProfileView(LoginRequiredMixin, UpdateView):
    model = UserProfile
    form_class = ProfileForm
    template_name = "customers/profile_form.html"

    def get_success_url(self):
        return reverse_lazy("customer_dashboard", kwargs={"pk": self.object.pk})



class MyPostsView(LoginRequiredMixin, TemplateView):
    template_name = 'customers/myposts.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(user=self.request.user).order_by('-created_at')
        return context




class PostingView(LoginRequiredMixin, CreateView):
    model = Post
    form_class = PostCreationForm
    template_name = 'customers/posting.html'
    success_url = reverse_lazy("home")

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

class PostDetailView(LoginRequiredMixin, DetailView):
    model = Post
    template_name = 'core/postdetail.html'  # 详情页的模板
    context_object_name = 'post'

    def get_object(self, queryset=None):
        post = super().get_object(queryset)
        # session_key = f"viewed_post_{post.pk}"
        # if not self.request.session.get(session_key, False):
        post.page_view += 1
        post.save(update_fields=["page_view"])
            # self.request.session[session_key] = True
        return post

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["comments"] = self.object.post_of_comment.all().order_by("-created_at")
        context["comment_count"] = self.object.post_of_comment.all().count()
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = CommentCreationForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = self.object
            comment.user = self.request.user
            comment.save()
            return redirect("post_detail", pk=self.object.pk)
        return self.get(request, *args, **kwargs)


class PostDeleteView(DeleteView):
    model = Post
    template_name = "customers/post_confirm_delete.html"
    success_url = reverse_lazy("home")

class PostReportView(LoginRequiredMixin, UpdateView):
    model = Post
    fields = ['post_status']
    template_name = "customers/report.html"

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        if request:
            post = self.object
            post.post_status = PostStatus.objects.get(status='auditing')
            post.save()
            return redirect("home", pk=self.object.pk)

        return self.get(request, *args, **kwargs)
