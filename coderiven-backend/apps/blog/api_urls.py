from ninja import Router
from apps.blog.views.api import post, tag, category, comment


blog_router = Router()

blog_router.add_router("/post", post.post_router, tags=["Post"])
blog_router.add_router("/tag", tag.tag_router, tags=["Tag"])
blog_router.add_router("/category", category.category_router, tags=["Category"])
