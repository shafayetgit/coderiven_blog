from django.db.models import Q, Exists, OuterRef
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

from ninja import Router
from typing import List
from ninja.pagination import paginate, PageNumberPagination

from coderiven.decorators import signin_required
from apps.blog.models import Comment, Like, Post
from apps.blog.schemas import post


post_router = Router()


@post_router.get("/list", response=List[post.PostListSchema])
@paginate(PageNumberPagination, page_size=5)
def list_posts(request, search: str = None):
    # Filter posts based on the search query if provided
    posts = Post.objects.all()
    if search:
        posts = posts.filter(
            Q(title__icontains=search)
            | Q(summary__icontains=search)
            | Q(content__icontains=search)
            | Q(tags__name__icontains=search)
            | Q(tags__slug__icontains=search)
        )

    # Annotate each post with the 'has_user_liked' field
    if request.user.is_authenticated:
        posts = posts.annotate(
            has_user_liked=Exists(
                Like.objects.filter(user=request.user, post=OuterRef("pk"))
            )
        )

    return posts


@post_router.get("/detail/{slug}", response=post.PostDetailSchema)
def detail(request, slug: str):
    post = get_object_or_404(Post, slug=slug)

    # Check if the authenticated user has liked the post
    if request.user.is_authenticated:
        post.has_user_liked = Like.objects.filter(user=request.user, post=post).exists()
    else:
        post.has_user_liked = False  # Default to False for unauthenticated users

    return post


@post_router.get("post-comment-list/{slug}", response=List[post.PostCommentListSchema])
def get_comments(request, slug: str):
    # Ensure the post exists
    post = get_object_or_404(Post, slug=slug)

    # Fetch only top-level comments (parent is null)
    comments = (
        Comment.objects.filter(post_id=post.id, parent__isnull=True)
        .prefetch_related("children")
        .select_related("user")
    )

    return comments


@post_router.post(
    "post-comment-create/{slug}",
    response=List[post.PostCommentCreateSchema],
)
@signin_required
def post_comment_create(request, slug: str, data: post.PostCommentCreateSchema):
    # Ensure the post exists
    post = get_object_or_404(Post, slug=slug)

    # Check if a parent comment is provided
    parent_comment = None
    if data.parent:
        parent_comment = get_object_or_404(Comment, id=data.parent)

    # Create the comment
    Comment.objects.create(
        content=data.content,
        user=request.user,
        post=post,
        parent=parent_comment,  # Set the parent if provided
    )

    return JsonResponse({}, status=201)



@post_router.post("post-like-or-dislike/{slug}")
@signin_required
def post_like_or_dislike(request, slug: str):
    post = get_object_or_404(Post, slug=slug)
    has_user_liked = Like.objects.filter(user=request.user, post=post).exists()
    if has_user_liked:
        Like.objects.filter(user=request.user, post=post).delete()
    else:
        Like.objects.create(user=request.user, post=post)

    return JsonResponse({}, status=201)

