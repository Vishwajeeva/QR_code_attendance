# user/views.py

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Student
from .serializers import StudentSerializer, UserLoginSerializer

class RegisterStudentView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(role='student', is_verified=False)  # Default to unverified

class VerifyStudentView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(role='student', is_verified=False)
    serializer_class = UserSerializer

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_verified = request.data.get("approved", False)
        user.save()
        return Response({"status": "Student verified" if user.is_verified else "Student rejected"})


class RegisterStudent(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save()
            return Response({"message": "Registration successful", "student_id": student.id})
        return Response({"error": serializer.errors}, status=400)

class LoginStudent(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({"error": "Invalid credentials"}, status=400)
