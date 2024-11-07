# attendance/models.py

from django.db import models
from django.utils import timezone
from user.models import StudentProfile

class Attendance(models.Model):
    ATTENDANCE_TYPES = (
        ('login', 'Login'),
        ('tea_break', 'Tea Break'),
        ('lunch', 'Lunch'),
        ('logout', 'Logout'),
    )

    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    attendance_type = models.CharField(max_length=20, choices=ATTENDANCE_TYPES)
    timestamp = models.DateTimeField(default=timezone.now)
    location = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.student.user.username} - {self.attendance_type} at {self.timestamp}"


class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def some_view(request):
        from user.models import Student