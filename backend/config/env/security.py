from decouple import config, Csv

def get_secret_key() -> str:
    """Returns the Django SECRET_KEY."""
    return config('SECRET_KEY', default='django-insecure-default-key-for-dev')

def get_debug() -> bool:
    """Returns the Django DEBUG status."""
    return config('DEBUG', default=False, cast=bool)

def get_allowed_hosts() -> list:
    """Returns the ALLOWED_HOSTS list."""
    return config('ALLOWED_HOSTS', default='127.0.0.1,localhost', cast=Csv())
