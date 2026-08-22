from typing import List
from ninja import ModelSchema, Schema

from apps.blog.models import Category, Post


class PostSchema(ModelSchema):
    class Meta:
        model = Post
        fields = ["id", "title", "slug"]


# -------------------Used in views------------------------------


class CategoryListSchema(ModelSchema):
    total_posts: int

    class Meta:
        model = Category
        fields = ["id", "name"]

    @staticmethod
    def resolve_total_posts(obj):
        return obj.posts.count()


class CategoryPostListSchema(Schema):
    category: str
    posts: List[PostSchema] = []
