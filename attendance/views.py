# attendance/views.py

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .models import Attendance
from .serializers import AttendanceSerializer
from user.models import StudentProfile
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from rest_framework.decorators import api_view
from user.models import Student 
from .models import Attendance


class MarkAttendanceView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AttendanceSerializer

    def post(self, request, *args, **kwargs):
        if request.user.role != 'student' or not request.user.is_verified:
            return Response({"error": "Unauthorized access"}, status=status.HTTP_403_FORBIDDEN)

        # Validate location data (latitude and longitude)
        allowed_location = (12.9715987, 77.594566)  # Replace with actual coordinates
        latitude = request.data.get("latitude")
        longitude = request.data.get("longitude")

        if (latitude, longitude) != allowed_location:
            return Response({"error": "Attendance marking is only allowed at specific location"},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(student=request.user.student_profile)
        return Response({"status": "Attendance marked successfully"})



class MarkAttendance(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        qr_code = request.data.get('qr_code')
        student = Student.objects.filter(qr_code=qr_code).first()

        if not student:
            return Response({"error": "Invalid QR Code"}, status=400)

        # Record attendance with the student info and current time
        attendance = Attendance.objects.create(
            student=student,
            status='Present',
            time=datetime.now(),
            date=datetime.now().date()
        )

        return Response({"message": "Attendance marked successfully", "attendance": attendance.id})



@api_view(['POST'])
def mark_attendance(request):
    student = request.user.student  # assuming the request is from an authenticated user
    qr_code = request.data.get('qr_code')
    
    # Validate QR code and attendance status
    attendance_status = "Morning Login"  # Example, you might dynamically determine this
    
    # Check if QR code is valid
    if not is_valid_qr_code(qr_code, student):
        return Response({"error": "Invalid QR Code"}, status=400)
    
    # Save attendance with status and timestamp
    attendance = Attendance(student=student, status=attendance_status, time=datetime.now())
    attendance.save()
    
    return Response({"message": "Attendance marked successfully"}, status=200)