from django.db import models
from django.conf import settings
from core.models import TimeStampedModel

class Event(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='calendar_events', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return f"{self.title} ({self.user.username})"
