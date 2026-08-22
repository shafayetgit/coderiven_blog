from ninja import Router
from apps.user.views.api import auth


user_router = Router()

user_router.add_router("/auth", auth.auth_router, tags=["Auth"])
# user_router.add_router("/tag", tag.tag_router, tags=["Tag"])
# user_router.add_router("/category", category.category_router, tags=["Category"])
