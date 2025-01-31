from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect


class BaseLoginRequiredMixin(LoginRequiredMixin):
    user_type = None
    login_url = None

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect(self.login_url)

        if getattr(request.user, 'type', None) != self.user_type:
            return redirect(self.login_url)

        return super().dispatch(request, *args, **kwargs)
