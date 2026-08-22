from typing import List
from django.shortcuts import get_object_or_404
from ninja import Router

from apps.blog import models
from apps.blog.schemas import comment

comment_router = Router()


@comment_router.get("list/{post_id}", response=List[comment.CommentListSchema])
def get_comments(request, post_id: int):
    post = models.Post.objects.get(id=post_id)
    print(post.comments.all())
    comments = (
        models.Comment.objects.filter(post_id=post_id)
        .select_related("parent")
        .prefetch_related("children")
    )
    return comments


# @comment_router.post("/comments", response=comment.CommentListSchema)
# def add_comment(request, data: comment.CommentSchema):
#     comment = models.Comment.objects.create(**data.dict(exclude_unset=True))
#     return comment
