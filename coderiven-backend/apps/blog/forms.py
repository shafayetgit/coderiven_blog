from django import forms

from apps.blog import models
from django.utils.text import slugify


class TagForm(forms.ModelForm):
    class Meta:
        model = models.Tag
        fields = ["name"]

    # def clean(self):
    #     cleaned_data = super().clean()

    #     if slugify(cleaned_data["name"]) != cleaned_data["slug"]:
    #         self.add_error("slug", "Name and Slug fields are not same.")


class CategoryForm(forms.ModelForm):
    class Meta:
        model = models.Category
        fields = ["name"]


class PostForm(forms.ModelForm):
    class Meta:
        model = models.Post
        exclude = ["created_by", "updated_by", "slug"]


class CommentForm(forms.ModelForm):
    class Meta:
        model = models.Comment
        fields = ["content"]
