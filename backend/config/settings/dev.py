from .base import *
from config.env.database import get_database_config

# Import DATABASE_URL from .env or default to sqlite3
DATABASES = get_database_config(BASE_DIR)

# CORS Settings for Frontend
CORS_ALLOW_ALL_ORIGINS = True
