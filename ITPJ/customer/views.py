from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import CreateView, TemplateView

from users.forms import CustomerRegistrationForm
from users.models import CustomUser


class CustomerRegisterView(CreateView):
    form_class = CustomerRegistrationForm
    template_name = 'users/register.html'
    success_url = reverse_lazy('customer_dashboard')

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return HttpResponseRedirect(self.success_url)


class BaseUserLoginView(LoginView):
    template_name = 'users/login.html'
    success_url = None

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_type'] = self.user_type.capitalize()
        return context

    def form_valid(self, form: AuthenticationForm) -> HttpResponse:
        user = form.get_user()
        if not user.is_superuser and user.type != self.user_type:
            messages.error(
                self.request,
                _('You must be a {} to log in here.').format(self.user_type),
            )
            return self.form_invalid(form)
        return super().form_valid(form)

    def get_success_url(self):
        return self.success_url


class ManagerLoginView(BaseUserLoginView):
    success_url = reverse_lazy('manager_dashboard')
    user_type = CustomUser.Type.MANAGER


class BaseLogoutView(LogoutView):
    next_page = reverse_lazy('home')

    def dispatch(self, request, *args, **kwargs):
        messages.success(request, _('You have been successfully logged out.'))
        return super().dispatch(request, *args, **kwargs)
