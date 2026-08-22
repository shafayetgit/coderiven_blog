from django.http import JsonResponse
from functools import wraps

def signin_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated:
            # Proceed to the view if authenticated
            return view_func(request, *args, **kwargs)
        else:
            # Return HTTP 401 Unauthorized if not authenticated
            return JsonResponse({"message": "Unauthorized"}, status=401)

    return _wrapped_view