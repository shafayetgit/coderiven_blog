from ninja import Schema, ModelSchema
from typing import List, Optional

from apps.blog.models import Comment
from apps.user.models import User


class UserSchema(Schema):
    id: int
    first_name: str
    last_name: str


# -------------------Used in views------------------------------
class CommentListSchema(ModelSchema):
    children: List["CommentListSchema"] = []  # Recursive children
    user: UserSchema

    class Meta:
        model = Comment
        fields = ["id", "user", "post", "parent", "content", "created_at"]

