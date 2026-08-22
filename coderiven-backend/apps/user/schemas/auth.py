from django.conf import settings
from ninja import ModelSchema, Schema

from apps.user.models import User


class SignInSchema(Schema):
    email: str
    password: str


class UserSchema(ModelSchema):
    full_name: str

    class Meta:
        model = User
        fields = ["email"]

    @staticmethod
    def resolve_full_name(obj) -> str:
        return obj.get_full_name()


class GoogleSignInSchema(ModelSchema):
    first_name: str = None
    last_name: str = None
    email: str

    class Meta:
        model = User
        fields = ["avatar"]
