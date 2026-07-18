from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, StudentProfile, TeacherProfile, AdminProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Automatically create role-specific profile when a user is created."""
    if created:
        if instance.role == 'student':
            StudentProfile.objects.get_or_create(
                user=instance,
                defaults={'enrollment_number': f'ENR-{instance.id}'}
            )
        elif instance.role == 'teacher':
            TeacherProfile.objects.get_or_create(
                user=instance,
                defaults={'employee_id': f'EMP-{instance.id}', 'department': 'General'}
            )
        elif instance.role == 'admin':
            AdminProfile.objects.get_or_create(user=instance)
