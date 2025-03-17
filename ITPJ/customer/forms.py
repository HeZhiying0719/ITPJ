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
            'category'

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