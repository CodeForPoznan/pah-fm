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
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.documentation import include_docs_urls
from pah_fm.views import CustomObtainJSONWebToken

from fleet_management.api import (
    CarListView,
    CurrentUserRetrieveView,
    DriveView,
    PassengerListView,
    ProjectView,
    RefuelView,
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/", include_docs_urls(title="PAH-FM", public=False)),
    path("api/api-token-auth/", CustomObtainJSONWebToken.as_view(), name="jwt"),
    path("api/users/me", CurrentUserRetrieveView.as_view(), name="me"),
    path("api/passengers", PassengerListView.as_view(), name="passengers"),
    path("api/cars", CarListView.as_view(), name="cars"),
    path("api/drives", DriveView.as_view(), name="drives"),
    path("api/projects", ProjectView.as_view(), name="projects"),
    path("api/refuels", RefuelView.as_view(), name="refuels"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
