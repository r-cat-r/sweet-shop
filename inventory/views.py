from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Sweet
from .serializers import SweetSerializer

@api_view(['GET'])
def list_sweets(request):
    sweets = Sweet.objects.all()
    serializer = SweetSerializer(sweets, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_sweet(request):
    serializer = SweetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buy_sweet(request, id):
    sweet = Sweet.objects.get(id=id)
    if sweet.quantity <= 0:
        return Response({"message": "Out of stock"})
    sweet.quantity -= 1
    sweet.save()
    return Response({"message": "Purchased!"})


@api_view(['POST'])
@permission_classes([IsAdminUser])
def restock_sweet(request, id):
    sweet = Sweet.objects.get(id=id)
    amount = int(request.data.get("amount", 1))
    sweet.quantity += amount
    sweet.save()
    return Response({"message": "Restocked!"})
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    return Response({
        "username": request.user.username,
        "is_staff": request.user.is_staff
    })
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def register_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"message": "Username & password required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "User created successfully"})
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    user = authenticate(username=username, password=password)
    print("aaaaaa",user)
    if user is None:
        return Response({"detail": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "username": user.username,
        "is_staff": user.is_staff
    })
