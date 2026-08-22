from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token

from typing import List
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from ninja import Router

from ninja_jwt.routers.blacklist import blacklist_router
from ninja_jwt.routers.obtain import obtain_pair_router, sliding_router
from ninja_jwt.routers.verify import verify_router

from apps.user.models import User
from apps.user.schemas import auth


auth_router = Router()

# auth_router.add_router("/sign-in", tags=["Auth"], router=obtain_pair_router)


@auth_router.post("/sign-in", response=auth.UserSchema)
def sign_in(request, data: auth.SignInSchema):
    # Authenticate user
    user = authenticate(email=data.email, password=data.password)
    print(user)
    if user is None:
        return JsonResponse({"detail": "Invalid credentials"}, status=400)

    # Sign the user in
    login(request, user)

    return user


@auth_router.post("/google-sign-in", response=auth.GoogleSignInSchema)
def google_sign_in(request, data: auth.GoogleSignInSchema):

    """
    Handles Google sign-in. If the user exists, logs them in; otherwise, creates a new user and logs them in.
    """
    # Check if the user exists by email
    user = User.objects.filter(email=data.email).first()

    if user:
        # Sign the existing user in
        login(request, user)
        return user

    # Create a new user if they do not exist
    user = User.objects.create(**data.dict())

    # Sign the new user in
    login(request, user)
    return user



@auth_router.post("/sign-out", response={200: dict})
def sign_out(request):
    if request.user.is_authenticated:
        logout(request)
        return {"message": "Successfully signed out."}
    return {"message": "No user was signed in."}

