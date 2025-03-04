from django import forms

from core.models import Post


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
