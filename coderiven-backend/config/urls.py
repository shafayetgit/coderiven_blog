from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib.sitemaps.views import sitemap

from .api import api

from apps.blog.sitemaps import PostSitemap

handler400 = TemplateView.as_view(template_name="errors/400.html")
handler403 = TemplateView.as_view(template_name="errors/403.html")
handler404 = TemplateView.as_view(template_name="errors/404.html")
handler500 = TemplateView.as_view(template_name="errors/500.html")

sitemaps = {
    "post": PostSitemap,
}

# web urls
urlpatterns = [
    path(
        "sitemap.xml",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
    # path("", TemplateView.as_view(template_name="firebase.html")),
    path("admin/", admin.site.urls),
    path("about/", TemplateView.as_view(template_name="about.html"), name="about"),
    path("blog/", include("apps.blog.web_urls", namespace="blog")),
]

# api urls
urlpatterns += [
    path("api/", api.urls),
]

# route for react
urlpatterns += [
    re_path(r"^(?:.*)/?$", TemplateView.as_view(template_name="frontend/index.html")),
]
