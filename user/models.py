# user/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('faculty', 'Faculty'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    is_verified = models.BooleanField(default=False)  

    def __str__(self):
        return f"{self.username} ({self.role})"

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    roll_number = models.CharField(max_length=20, unique=True)
    year = models.IntegerField()
    department = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    qr_code = models.ImageField(upload_to='qrcodes/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.user.is_verified and not self.qr_code:
            qr_image = qrcode.make(self.roll_number)
            qr_offset = Image.new("RGB", (400, 400), "white")
            qr_offset.paste(qr_image)
            stream = BytesIO()
            qr_offset.save(stream, "PNG")
            self.qr_code.save(f"{self.user.username}_qr.png", File(stream), save=False)
        super().save(*args, **kwargs)

    
    
    def __str__(self):
        return f"{self.user.username} - {self.department}"

class FacultyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='faculty_profile')
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.department}"





class Student(models.Model):
    # Your fields here, for example:
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # Add other fields as needed
