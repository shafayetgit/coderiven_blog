from django.db import models
from django.conf import settings
from django.urls import reverse

from mptt.models import MPTTModel, TreeForeignKey

from coderiven.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=20, unique=True)
    slug = models.SlugField(max_length=50, unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Post(BaseModel):
    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=300, unique=True,)
    summary = models.TextField(
        null=True, blank=True
    )  # add it when you update model, max_length=500,
    content = models.TextField()
    is_published = models.BooleanField(default=False)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="posts"
    )
    tags = models.ManyToManyField(Tag, related_name="posts")
    related_posts = models.ManyToManyField("self", blank=True)
    views = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Post('{self.title}', '{self.created_at}')"

    def get_absolute_url(self) -> str:
        return reverse("blog:post-detail", args=[self.slug])

    def user_has_like(self, user: settings.AUTH_USER_MODEL) -> bool:
        return self.likes.filter(user=user).exists()

    def total_likes(self) -> int:
        return self.likes.count()
    
    def total_comments(self) -> int:
        return self.comments.count()

    def get_comments(self) -> models.QuerySet["Comment"]:
        return self.comments.order_by("-created_at")


class Like(BaseModel):
    created_by = None
    updated_by = None
    post = models.ForeignKey(Post, on_delete=models.PROTECT, related_name="likes")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    def __str__(self):
        return self.user.username


class Comment(MPTTModel, BaseModel):
    created_by = None
    updated_by = None
    content = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    post = models.ForeignKey(Post, on_delete=models.PROTECT, related_name="comments", null=True)
    parent = TreeForeignKey(
        "self",
        null=True,
        blank=True,
        related_name="children",
        on_delete=models.CASCADE,
    )
    is_published = models.BooleanField(default=False)

    class MPTTMeta:
        order_insertion_by = ["created_at"]

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.content[:20]}"
