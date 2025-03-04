from django.contrib import admin
from customer.models import UserProfile

# @admin.register(Favicon)
# class FaviconAdmin(admin.ModelAdmin):
#     list_display = (
#         'user',
#         'post_id',
#         'created_at',
#         'updated_at',
#     )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'avatar',
        'introduction',
    )
