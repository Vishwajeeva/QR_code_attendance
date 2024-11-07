# user/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, StudentProfile, FacultyProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'student':
            StudentProfile.objects.create(user=instance)
        elif instance.role == 'faculty':
            FacultyProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if instance.role == 'student' and hasattr(instance, 'student_profile'):
        instance.student_profile.save()
    elif instance.role == 'faculty' and hasattr(instance, 'faculty_profile'):
        instance.faculty_profile.save()
