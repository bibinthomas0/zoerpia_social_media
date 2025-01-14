from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from verification.models import CustomUser
from .serializers import (
    UserRegisterSerializer,
    AdminRegisterSerializer,
    AdminUserSerializer,
)
from django.contrib.auth.hashers import make_password
from rest_framework.generics import ListCreateAPIView
import random
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from .serializers import OtpRequestSerializer, UsernameSerializer, EmailSerializer,UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from verification.managers import CustomUserManager
from django.contrib.auth import logout
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from verification.tasks import send_notification_mail
from verification.models import UserOtp


class getAccountsRoutes(APIView):
    def get(self, request, format=None):
        routes = [
            "api/accounts/login",
            "api/accounts/register",
        ]
        return Response(routes)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        email = request.data["email"]
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        content = {"Message": "User Registered Successfully"}
        return Response(
            content,
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]
        except KeyError:
            content = "All Fields Are Required"
            return Response(
                content,
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not CustomUser.objects.filter(email=email).exists():
            content = "Invalid Email Address"
            return Response(
                content,
                status=status.HTTP_404_NOT_FOUND,
            )

        elif CustomUser.objects.filter(email=email, is_blocked=True).exists():
            raise AuthenticationFailed(
                "You are blocked by admin ! Please contact admin"
            )
        else:
            user = authenticate(username=email, password=password)
            if user is None:
                content = "invalid password"
                return Response(content, status=status.HTTP_410_GONE)
            refresh = RefreshToken.for_user(user)
            refresh["username"] = str(user.username)
            content = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "isAdmin": user.is_superuser,
            }
           
            
        return Response(content, status=status.HTTP_200_OK)


class OtpRequestView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data["email"]
        if CustomUser.objects.filter(email=email).exists():
            content = {"Message": "email already registered"}
            return Response(
                content,
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )
        else:
            send_notification_mail(email)
            return Response( status=status.HTTP_201_CREATED)
 
 

class UsernameValidation(APIView):
    def post(self, request):
        serializer = UsernameSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            if CustomUser.objects.filter(username=username).exists():
                content = {"Message": "Username already taken"}
                print("exist")
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                content = {"Message": "Valid"}
                return Response(content, status=status.HTTP_202_ACCEPTED)
        else:
            errors = serializer.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPassword(APIView):
    def post(self, request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            if not CustomUser.objects.filter(email=email).exists():
                content = {"Message": "email not registered"}
                print("exist")
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                custom_user_manager = CustomUserManager()
                custom_user_manager.send_otp_email(request, email)
                otp = request.session.get("otp")
                print(otp)
                return Response(otp, status=status.HTTP_202_ACCEPTED)


class OtpValidation(APIView):
    def verify_otp(userotp, authotp):
        return int(userotp) == int(authotp)
    
    def post(self, request):
        userotp = request.data["otp"]
        email = request.data['email']
        authotp = UserOtp.objects.filter(email=email).order_by("-created_at").first().otp
        print(userotp,authotp)
        if OtpValidation.verify_otp(userotp, authotp):
            print("hi")
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            print("bye")
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


class ChangePasswordView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        user = CustomUser.objects.get(email=email)
        if user:
            newpass = make_password(password)
            user.password = newpass
            user.save()
            print("changed")
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status.HTTP_404_NOT_FOUND)


class AdminRegisterView(APIView):
    def post(self, request):
        request.data["userid"] = str(random.randint(100000, 999999))
        print(request.data)
        serializer = AdminRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        content = {"Message": "User Registered Successfully"}
        return Response(
            content,
            status=status.HTTP_201_CREATED,
        )


class Logout(APIView):
    def post(self, request):
        logout(request)


class AdminUserListCreateView(ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AdminUserSerializer
    pagination_class = PageNumberPagination
    filter_backends = [SearchFilter]
    search_fields = ["first_name", "last_name", "email", "phone_number"]


class GoogleLogin(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not CustomUser.objects.filter(email=email).exists():
            serializer = UserRegisterSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = CustomUser.objects.get(email=email)
        refresh = RefreshToken.for_user(user)
        refresh["username"] = str(user.username)

        response_data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "isAdmin": user.is_superuser,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)


class BlockVerification(APIView):
    def get(self, request):
        username = request.data.get("name")
        user = CustomUser.objects.get(username=username)
        if user.is_blocked == True:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

class UserDetail(APIView):
    def get(self, request):
        username = request.query_params.get("username")
        
        try:
            user_instance = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AdminUserSerializer(user_instance)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    
    
class UpdateName(APIView):
    def put(self, request):
        username = request.data.get("username")
        new_name = request.data.get("newname")
        print(username,new_name)
        try:
            user = CustomUser.objects.get(username=username)
            user.name = new_name
            user.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class UpdateBirthDate(APIView):
    def put(self, request):
        username = request.data.get("username")
        dob = request.data.get("dob")
        print(username,dob)
        try:
            user = CustomUser.objects.get(username=username)
            user.dob = dob
            user.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


def HealthCheck(request):
    return Response(status=status.HTTP_200_OK)