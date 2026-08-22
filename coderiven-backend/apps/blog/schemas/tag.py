from typing import List, Optional
from ninja import ModelSchema, Schema
from pydantic import BaseModel

from apps.blog.models import Post, Tag


class PostSchema(ModelSchema):
    class Meta:
        model = Post
        fields = ["id", "title", "slug"]


# -------------------Used in views------------------------------
class TagListSchema(ModelSchema):
    total_posts: int

    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]

    @staticmethod
    def resolve_total_posts(obj):
        return obj.posts.count()


class TagPostListSchema(Schema):
    tag: str
    posts: List[PostSchema] = []
