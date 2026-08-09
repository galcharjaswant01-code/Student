import dj_database_url
from decouple import config
from pathlib import Path

def get_database_config(base_dir: Path) -> dict:
    """
    Reads DATABASE_URL from environment and returns a Django-compatible DATABASES dictionary.
    Falls back to sqlite3 if not provided or empty.
    """
    db_url = config('DATABASE_URL', default='').strip()
    if not db_url:
        db_url = f"sqlite:///{base_dir / 'db.sqlite3'}"
    
    parsed = dj_database_url.parse(db_url, conn_max_age=600, conn_health_checks=True)
    if not parsed:
        parsed = {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': base_dir / 'db.sqlite3',
        }
    return {'default': parsed}
