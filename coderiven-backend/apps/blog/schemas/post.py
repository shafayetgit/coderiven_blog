from typing import List, Optional
from ninja import Field, ModelSchema, Schema

import readtime

from apps.blog.models import Comment, Post, Tag


class TagSchema(ModelSchema):
    class Meta:
        model = Tag
        fields = ["name", "slug"]


class RelatedPostSchema(ModelSchema):
    class Meta:
        model = Post
        fields = ["id", "title", "slug"]


class PostCommentUserSchema(Schema):
    id: int
    first_name: str
    last_name: str


# -------------------Used in views------------------------------
class PostListSchema(ModelSchema):
    tags: List[TagSchema] = []
    reading_time: str
    has_user_liked: bool = None
    total_likes: int
    total_comments: int

    class Meta:
        model = Post
        fields = "__all__"

    @staticmethod
    def resolve_reading_time(obj) -> str:
        return str(readtime.of_text(obj.content))

    @staticmethod
    def resolve_total_likes(obj) -> int:
        return obj.total_likes()

    @staticmethod
    def resolve_total_comments(obj) -> int:
        return obj.total_comments()


class PostDetailSchema(ModelSchema):
    tags: List[TagSchema] = []
    related_posts: list[RelatedPostSchema] = []
    reading_time: str
    has_user_liked: bool
    total_likes: int
    total_comments: int
    author: dict

    class Meta:
        model = Post
        fields = "__all__"

    @staticmethod
    def resolve_reading_time(obj) -> str:
        return str(readtime.of_text(obj.content))

    @staticmethod
    def resolve_author(obj) -> dict:
        author = obj.created_by
        return {
            "full_name": author.get_full_name() if author else "",
            "avatar": author.avatar if author and author.avatar else "",
        }

    @staticmethod
    def resolve_total_likes(obj) -> int:
        return obj.total_likes()

    @staticmethod
    def resolve_total_comments(obj) -> int:
        return obj.total_comments()


class PostCommentListSchema(ModelSchema):
    children: List["PostCommentListSchema"] = []  # Recursive children
    user: PostCommentUserSchema

    class Meta:
        model = Comment
        fields = ["id", "user", "post", "parent", "content", "created_at"]


class PostCommentCreateSchema(Schema):
    content: str
    parent: int = None
