def save_updated_by_and_created_by(request, obj):
    if(obj.id is not None):
        obj.updated_by = request.user
    else:
        obj.created_by = request.user