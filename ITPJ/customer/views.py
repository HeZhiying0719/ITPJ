from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import CreateView, TemplateView
from customer.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView
from users.forms import CustomerRegistrationForm
from users.models import CustomUser
from users.views import BaseUserLoginView

# class LoginView(BaseUserLoginView):
#     success_url = reverse_lazy('customer_dashboard')
#     user_type = CustomUser.Type.CUSTOMER
#
#
# class DashboardView(LoginRequiredMixin, ListView):
#     # template_name = 'customers/dashboard.html'
#     # model = Trip
#     # queryset = Trip.objects.select_related('start_location', 'payment')
#     # context_object_name = 'trips'
#     # paginate_by = 10
#     # ordering = '-start_time'
#     #
#     # def get_queryset(self):
#     #     queryset = super().get_queryset()
#     #     queryset = queryset.filter(user=self.request.user)
#     #     return queryset
#     #

class CustomerHomePageView(LoginView):
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
