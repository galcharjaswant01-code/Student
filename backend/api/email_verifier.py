import logging

logger = logging.getLogger(__name__)

def verify_email_address(email: str) -> dict:
    """
    Mock email verification API.
    """
    if not email or '@' not in email:
        return {'is_valid': False, 'reason': 'Invalid email format'}
        
    return {'is_valid': True, 'reason': 'Email is valid'}
