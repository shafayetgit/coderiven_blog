from ninja import NinjaAPI


api = NinjaAPI()


api.add_router("blog/", "apps.blog.api_urls.blog_router", tags="blog")
api.add_router("user/", "apps.user.api_urls.user_router", tags="user")
