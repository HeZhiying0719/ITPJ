from django.urls import reverse_lazy

from users.mixins import BaseLoginRequiredMixin
from users.models import CustomUser


class LoginRequiredMixin(BaseLoginRequiredMixin):
    user_type = CustomUser.Type.MANAGER
    login_url = reverse_lazy('operator_login')
