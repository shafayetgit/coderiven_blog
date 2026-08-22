from typing import List
from django.shortcuts import get_object_or_404
from ninja import Router

from apps.blog.models import Category
from apps.blog.schemas import category

category_router = Router()


@category_router.get("/list", response=List[category.CategoryListSchema])
def list(request):
    return Category.objects.all()


@category_router.get("/post-list/{id}", response=category.CategoryPostListSchema)
def category_post_list(request, id: int):
    category = get_object_or_404(Category, id=id)

    return {
        "category": category.name,
        "posts": category.posts.all(),
    }
