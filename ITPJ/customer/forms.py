from django import forms

from core.models import Post, Comment
from customer.models import UserProfile


class PostCreationForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = [
            'title',
            'photo',
            'content',
            'category1',
            'category2',
            'category3',
            'category4',
            'category5'
        ]

class CommentCreationForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = [
            'content'
        ]

class ProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = [
            'avatar',
            'introduction'
        ]