from django.contrib import admin

from core.models import Post, Category, Comment


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
        'like_num',
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

