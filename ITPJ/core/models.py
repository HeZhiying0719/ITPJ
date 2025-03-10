from django.db import models
from django.conf import settings
import random

class Category(models.Model):
    category_id = models.IntegerField(unique=True, primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Post(models.Model):
    post_id = models.CharField(max_length=8, unique=True, primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.SET_NULL,
        related_name='poster',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.TextField(max_length=100, null=False, blank=False)

    photo = models.ImageField(upload_to='media/post_photos', null=True, blank=True)

    content = models.TextField(max_length=500, null=False, blank=True)

    category1 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category1')
    category2 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category2', blank=True)
    category3 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category3', blank=True)
    category4 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category4', blank=True)
    category5 = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='category5', blank=True)

    like_num = models.IntegerField(default=0)



    def save(self, *args, **kwargs):
        if not self.post_id:
            self.post_id = self.__generate_unique_id()
        super().save(*args, **kwargs)

    def __generate_unique_id(self):
        while True:
            post_id = str(random.randint(10000000, 99999999))
            if not Post.objects.filter(post_id=post_id).exists():
                return post_id



class Comment(models.Model):
    comment_id = models.CharField(max_length=10, unique=True, primary_key=True)

    post_id = models.OneToOneField(
        Post, on_delete=models.CASCADE, related_name='post_of_comment'
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_of_comment'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    content = models.TextField(max_length=500, null=False, blank=True)

    like_num = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.comment_id:
            self.comment_id = self.__generate_unique_id()
        super().save(*args, **kwargs)

    def __generate_unique_id(self):
        while True:
            comment_id = str(random.randint(1000000000, 9999999999))
            if not Comment.objects.filter(comment_id=comment_id).exists():
                return comment_id


