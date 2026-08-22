from django.contrib import admin
from django.utils.text import slugify

from apps.blog import models
from apps.blog import forms

from coderiven import utils


# Tag
@admin.register(models.Tag)
class TagAdmin(admin.ModelAdmin):
    form = forms.TagForm

    list_display = [
        "name",
        "slug",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
    ]

    def save_model(self, request, obj, form, change):
        utils.save_updated_by_and_created_by(request, obj)
        obj.slug = slugify(obj.name)
        super().save_model(request, obj, form, change)


# Category
@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    form = forms.CategoryForm
    list_display = ["name", "created_by", "updated_by", "created_at", "updated_at"]

    def save_model(self, request, obj, form, change):
        utils.save_updated_by_and_created_by(request, obj)
        obj.slug = slugify(obj.name)
        super().save_model(request, obj, form, change)


# Post
@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    form = forms.PostForm
    # prepopulated_fields = {"slug": ("title",)}

    list_display = [
        "title",
        "slug",
        "summary",
        "content",
        "is_published",
        "views",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
    ]

    def save_model(self, request, obj, form, change):
        utils.save_updated_by_and_created_by(request, obj)
        obj.slug = slugify(obj.title)
        super().save_model(request, obj, form, change)


admin.site.register(models.Like)
admin.site.register(models.Comment)
