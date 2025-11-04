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
