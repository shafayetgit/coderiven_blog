from django.contrib.sitemaps import Sitemap
from django.db.models import QuerySet
from django.db.models.base import Model
from apps.blog.models import Post

class PostSitemap(Sitemap):
    changefreq = 'daily'
    priority = 0.5

    def items(self) -> QuerySet[Post]:
        return Post.objects.all()

    def location(self, obj: Model) -> str:
        return obj.get_absolute_url