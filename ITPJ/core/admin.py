from django.contrib import admin

from core.models import Post, Category

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'post_id',
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
    readonly_fields = ('post_id',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )