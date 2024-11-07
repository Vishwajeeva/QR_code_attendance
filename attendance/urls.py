# attendance/urls.py

from django.urls import path
from .views import MarkAttendanceView

urlpatterns = [
    path('mark/', MarkAttendanceView.as_view(), name='mark_attendance'),
]
