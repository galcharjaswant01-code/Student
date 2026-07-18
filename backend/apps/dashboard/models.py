from django.db import models
from django.conf import settings


class DashboardLayout(models.Model):
    """
    Stores the personalized dashboard layout, visible widgets,
    and theme preferences for each user.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='dashboard_layout'
    )
    layouts = models.JSONField(
        default=dict,
        blank=True,
        help_text="Stores lg, md, sm breakpoint layout arrays for react-grid-layout."
    )
    visible_widgets = models.JSONField(
        default=list,
        blank=True,
        help_text="Ordered list of active widget keys."
    )
    theme_preferences = models.JSONField(
        default=dict,
        blank=True,
        help_text="Stores theme (dark/light), mode, sidebarWidth, isSidebarCollapsed etc."
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'dashboard_layout'

    def __str__(self):
        return f"Layout for {self.user.username}"
