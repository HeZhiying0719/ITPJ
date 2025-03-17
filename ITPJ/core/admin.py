from django.contrib import admin

from core.models import Post, Category, Comment, PostStatus


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'post_id',
        'user',
        'title',
        'content',
        'category',
        'created_at',
        'updated_at',
        'like_num',
        'page_view',
    )
    readonly_fields = ('post_id',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )

@admin.register(Comment)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'post_id',
        'user',
        'content',
        'created_at',
        'updated_at',
        'like_num',
    )
    readonly_fields = ('comment_id',)


@admin.register(PostStatus)
class PostStatusAdmin(admin.ModelAdmin):
    list_display = (
        'status',
    )

