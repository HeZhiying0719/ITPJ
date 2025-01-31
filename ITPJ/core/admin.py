from django.contrib import admin

from core.models import Blog, Category

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = (
        'blog_id',
        'user',
        'title',
        'content',
        'category1',
        'category2',
        'category3',
        'category4',
        'category5',
        'created_at',
        'updated_at',
    )


@admin.register(Category)
class BlogAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )