from django.views import generic, View
from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Q
from django.contrib import messages

from apps.blog.models import Post, Category, Tag, Like, Comment
from apps.blog import forms

class IndexView(generic.ListView):
    model = Post
    template_name = "blog/index.html"
    context_object_name = "posts"
    paginate_by = 10

    def get_queryset(self):
        search = self.request.GET.get("search", "")
        if search:
            return Post.objects.filter(
                Q(title__icontains=search)
                | Q(summary__icontains=search)
                | Q(content__icontains=search)
                | Q(tags__name__icontains=search)
                | Q(tags__slug__icontains=search)
            )
        return Post.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = Category.objects.all().order_by("name")
        return context


class PostDetailView(generic.DetailView):
    model = Post
    template_name = "blog/post-detail.html"
    context_object_name = "post"

    def get(self, request, *args, **kwargs):
        post = self.get_object()
        post.views += 1
        post.save()
        return super().get(request, *args, **kwargs)


class PostListByTagView(generic.ListView):
    template_name = "blog/post-list-by-tag.html"
    context_object_name = "posts"

    def get_queryset(self):
        self.tag = get_object_or_404(Tag, name=self.kwargs["slug"])
        return Post.objects.filter(tags=self.tag.id)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["tag"] = self.tag
        return context


class PostListByCategoryView(generic.ListView):
    template_name = "blog/post-list-by-category.html"
    context_object_name = "posts"

    def get_queryset(self):
        self.category = get_object_or_404(Category, pk=self.kwargs["pk"])
        print(self.kwargs)
        return Post.objects.filter(category=self.kwargs["pk"])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["category"] = self.category
        return context


class PostLikeOrDislikeView(View):
    def post(self, request, *args, **kwargs):
        post = get_object_or_404(Post, pk=kwargs["pk"])
        has_user_liked = Like.objects.filter(user=request.user, post=post).exists()
        if has_user_liked:
            Like.objects.filter(user=request.user, post=post).delete()
        else:
            Like.objects.create(user=request.user, post=post)

        return render(request, "blog/partials/like.html", {"post": post})


class PostCommentView(View):
    form_class = forms.CommentForm

    def post(self, request, *args, **kwargs):
        post = get_object_or_404(Post, pk=kwargs["pk"])
        form = self.form_class(request.POST)

        if form.is_valid():
            Comment.objects.create(
                user=request.user, post=post, content=form.cleaned_data["content"]
            )
            messages.success(request, "Your comment has been added successfully!")
        else:
            messages.error(
                request,
                f"Oops! There was an error with your comment: {form.errors.as_ul()}",
            )

        return redirect("blog:post-detail", slug=post.slug)
