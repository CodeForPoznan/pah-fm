from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
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
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenObtainSlidingView,
    TokenRefreshView,
)

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html"), name="index"),
    path("admin/docs/", include("django.contrib.admindocs.urls")),
    path("admin/", admin.site.urls),
    path("api/schema", get_schema_view(title="PAH-FM"), name="api-schema"),
    path(
        "api/docs/",
        TemplateView.as_view(
            template_name="api-docs.html",
            extra_context={"schema_url": "api-schema"},
        ),
        name="api-docs",
    ),
    path("api/users/me", CurrentUserRetrieveView.as_view(), name="me"),
    path("api/passengers", PassengerListView.as_view(), name="passengers"),
    path("api/cars", CarListView.as_view(), name="cars"),
    path("api/drives", DriveView.as_view(), name="drives"),
    path("api/projects", ProjectView.as_view(), name="projects"),
    path("api/refuels", RefuelView.as_view(), name="refuels"),
    path("api/authenticate", TokenObtainPairView.as_view(), name="authenticate"),
    path("api/api-token-auth/", TokenObtainSlidingView.as_view(), name="jwt"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
