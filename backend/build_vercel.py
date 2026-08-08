import os
import subprocess

# Set the Django settings module for Vercel
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.prod")

# Run collect static
subprocess.run(["python", "manage.py", "collectstatic", "--noinput"], check=True)
