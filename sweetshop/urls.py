"""
URL configuration for sweetshop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from inventory.views import list_sweets, add_sweet, buy_sweet, restock_sweet
from inventory.views import login_user

from inventory.views import user_info
from inventory.views import register_user
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),

    path("api/login/", login_user),
    path("api/register/", register_user),

    path("api/refresh/", TokenRefreshView.as_view()),

    path("api/sweets/", list_sweets),
    path("api/sweets/add/", add_sweet),
    path("api/sweets/<int:id>/buy/", buy_sweet),
    path("api/sweets/<int:id>/restock/", restock_sweet),
    path("api/user/", user_info),


]
