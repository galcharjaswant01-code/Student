import os
import firebase_admin
from firebase_admin import credentials, auth
from django.conf import settings

# Initialize Firebase Admin SDK
# The path to the service account JSON key should be in settings or environment variable
# If it's not set, it will look for FIREBASE_CREDENTIALS in env or default path
cred_path = getattr(settings, 'FIREBASE_CREDENTIALS', os.path.join(settings.BASE_DIR, 'firebase-service-account.json'))

try:
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
    else:
        # Fallback to default credentials (e.g. env var GOOGLE_APPLICATION_CREDENTIALS)
        if not firebase_admin._apps:
            firebase_admin.initialize_app()
except Exception as e:
    import logging
    logger = logging.getLogger(__name__)
    logger.warning(f"Firebase Admin initialization failed: {e}")

def verify_firebase_token(id_token):
    """
    Verifies a Firebase ID token and returns the decoded token payload.
    """
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error verifying Firebase token: {e}")
        return None
