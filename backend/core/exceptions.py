"""
Custom exception handler for the Student Management System API.
Returns consistent JSON error responses across all endpoints.
"""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Returns responses in the standard format:
    {
        "success": false,
        "error": "Human readable message",
        "details": { ... }  # optional field-level errors
    }
    """
    response = exception_handler(exc, context)

    if response is not None:
        error_data = {
            'success': False,
            'error': None,
            'details': None,
        }

        if isinstance(response.data, dict):
            # DRF field-level validation errors
            if 'detail' in response.data:
                error_data['error'] = str(response.data['detail'])
            else:
                error_data['error'] = 'Validation failed.'
                error_data['details'] = response.data
        elif isinstance(response.data, list):
            error_data['error'] = 'Request error.'
            error_data['details'] = response.data
        else:
            error_data['error'] = str(response.data)

        response.data = error_data
    else:
        # Unhandled exceptions (500)
        logger.exception("Unhandled exception: %s", str(exc))
        response = Response(
            {'success': False, 'error': 'An internal server error occurred.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return response
