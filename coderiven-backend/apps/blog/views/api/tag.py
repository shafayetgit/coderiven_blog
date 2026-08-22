from typing import List
from django.shortcuts import get_object_or_404
from ninja import Router

from apps.blog.models import Tag
from apps.blog.schemas import tag


tag_router = Router()


@tag_router.get("/list", response=List[tag.TagListSchema])
def list(request):
    return Tag.objects.all()


@tag_router.get("/post-list/{slug}", response=tag.TagPostListSchema)
def post_list(request, slug: str):
    tag = get_object_or_404(Tag, name=slug)

    return {
        "tag": tag.name,
        "posts": tag.posts.all(),
    }
