import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ITPJ.settings')
import django
django.setup()

from django.contrib.auth import get_user_model
from core.models import Category, PostStatus, Post, Comment

User = get_user_model()

def populate():
    # 创建一个测试用户（用于Post和Comment），若已存在则直接使用
    test_user, created = User.objects.get_or_create(username='testuser')
    if created:
        test_user.set_password('password')  # 设置初始密码
        test_user.save()
    
    # 创建分类（Category）
    cat1 = add_category(1, 'Technology')
    cat2 = add_category(2, 'Lifestyle')
    cat3 = add_category(3, 'Travel')
    
    # 创建帖子状态（PostStatus）
    status_auditing = add_post_status(PostStatus.Status.AUDITING)
    status_okey     = add_post_status(PostStatus.Status.OKEY)
    status_baned    = add_post_status(PostStatus.Status.BANED)
    
    # 创建帖子（Post）
    post1 = add_post(
        title="Tech Innovations",
        content="Discussion about the latest tech innovations.",
        user=test_user,
        category1=cat1,
        post_status=status_auditing,
        like_num=15,
        page_view=150,
    )
    
    post2 = add_post(
        title="Travel Guide",
        content="A comprehensive guide for travelers.",
        user=test_user,
        category1=cat3,
        post_status=status_okey,
        like_num=8,
        page_view=80,
    )
    
    # 创建评论（Comment）
    comment1 = add_comment(
        post=post1,
        user=test_user,
        content="Great insights on technology!",
        like_num=3,
    )
    
    comment2 = add_comment(
        post=post2,
        user=test_user,
        content="This travel guide is very helpful!",
        like_num=5,
    )
    
    # 打印所有帖子和其对应的评论
    for post in Post.objects.all():
        print(f'Post: {post.title} - ID: {post.post_id} - Status: {post.post_status}')
        for comment in Comment.objects.filter(post=post):
            print(f'  Comment: {comment.content} - ID: {comment.comment_id}')

def add_category(category_id, name):
    # 使用 get_or_create 保证不会重复创建
    cat, created = Category.objects.get_or_create(category_id=category_id, defaults={'name': name})
    if not created:
        cat.name = name
        cat.save()
    return cat

def add_post_status(status_value):
    ps, created = PostStatus.objects.get_or_create(status=status_value)
    if not created:
        ps.status = status_value
        ps.save()
    return ps

def add_post(title, content, user, category1, post_status, like_num=0, page_view=0):
    # Post 的 post_id 字段会在 save() 时自动生成
    post, created = Post.objects.get_or_create(
        title=title,
        defaults={
            'content': content,
            'user': user,
            'category1': category1,
            'post_status': post_status,
            'like_num': like_num,
            'page_view': page_view,
        }
    )
    if not created:
        post.content = content
        post.user = user
        post.category1 = category1
        post.post_status = post_status
        post.like_num = like_num
        post.page_view = page_view
        post.save()
    return post

def add_comment(post, user, content, like_num=0):
    comment, created = Comment.objects.get_or_create(
        post=post,
        content=content,
        defaults={
            'user': user,
            'like_num': like_num,
        }
    )
    if not created:
        comment.user = user
        comment.like_num = like_num
        comment.save()
    return comment

if __name__ == '__main__':
    print('Starting population script for new project...')
    populate()
