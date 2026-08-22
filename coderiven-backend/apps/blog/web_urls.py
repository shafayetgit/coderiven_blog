from django.urls import path

from apps.blog.views.web import post

app_name='blog'
urlpatterns = [
    path('', post.IndexView.as_view(), name='index'),
    path('post-detail/<slug:slug>', post.PostDetailView.as_view(), name='post-detail'),
    path('post-list-by-tag/<slug:slug>', post.PostListByTagView.as_view(), name='post-list-by-tag'),
    path('post-list-by-category/<int:pk>', post.PostListByCategoryView.as_view(), name='post-list-by-category'),
    path('post-like-or-dislike/<int:pk>', post.PostLikeOrDislikeView.as_view(), name='post-like-or-dislike'),
    path('post-comment/<int:pk>', post.PostCommentView.as_view(), name='post-comment'),
]

