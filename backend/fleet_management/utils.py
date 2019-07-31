from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        err = exc.detail.get('non_field_errors')
        if 'must make a unique set.' in err[0]:
            response.status_code = 422
    return response
