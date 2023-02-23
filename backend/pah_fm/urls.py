"""pah_fm URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from fleet_management.api import (
    CarListView,
    CurrentUserRetrieveView,
    DriveView,
    PassengerListView,
    ProjectView,
    RefuelView,
)
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/", get_schema_view(title="PAH-FM"), name="openapi-schema"),
    path(
        "api/swagger-ui/",
        TemplateView.as_view(
            template_name="swagger-ui.html",
            extra_context={"schema_url": "openapi-schema"},
        ),
        name="swagger-ui",
    ),
    path("api/users/me", CurrentUserRetrieveView.as_view(), name="me"),
    path("api/passengers", PassengerListView.as_view(), name="passengers"),
    path("api/cars", CarListView.as_view(), name="cars"),
    path("api/drives", DriveView.as_view(), name="drives"),
    path("api/projects", ProjectView.as_view(), name="projects"),
    path("api/refuels", RefuelView.as_view(), name="refuels"),
    path("api/api-token-auth/", TokenObtainPairView.as_view(), name="jwt"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
