"""
Celery configuration for the Student Management System.

Background tasks include:
- Sending email notifications
- Generating analytics snapshots
- Processing AI Studio requests asynchronously
- Cleaning up expired tokens
"""
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')

app = Celery('student_management')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
