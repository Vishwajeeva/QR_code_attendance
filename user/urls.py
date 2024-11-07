# user/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterStudentView, VerifyStudentView
from .views import RegisterStudent, LoginStudent

urlpatterns = [
    path('register/', RegisterStudentView.as_view(), name='register_student'),
    path('register/', RegisterStudent.as_view(), name='register_student'),
    path('login/', LoginStudent.as_view(), name='login_student'),
    path('verify/<int:pk>/', VerifyStudentView.as_view(), name='verify_student'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
