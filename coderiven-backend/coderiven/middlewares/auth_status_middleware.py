import json


class AuthStatusMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        content_type = response.get("Content-Type", "")

        if "application/json" in content_type:
            try:
                # Decode response content
                response_data = json.loads(response.content.decode("utf-8"))

                # Check if response data is a list or dictionary
                if isinstance(response_data, list):
                    # For lists, add a wrapper to include authentication status
                    response_data = {
                        "data": response_data,
                        "isAuthenticated": request.user.is_authenticated,
                    }
                else:
                    # For dictionaries, directly add the authentication status
                    response_data["isAuthenticated"] = request.user.is_authenticated

                # Update the response content
                response.content = json.dumps(response_data)
                response["Content-Length"] = str(len(response.content))
            except (ValueError, AttributeError, UnicodeDecodeError) as e:
                # Log or handle errors if needed
                print("Error updating response content:", e)

        return response
