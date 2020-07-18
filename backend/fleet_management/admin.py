from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field
from import_export import resources

from fleet_management.models import Car, Drive, User, Project


class CountryFilter(admin.SimpleListFilter):
    title = _("Country")
    parameter_name = "country"

    def lookups(self, request, model_admin):
        objects = model_admin.model.objects.distinct(self.parameter_name)
        countries = [(o.country.code, o.country.name) for o in objects]
        countries = sorted(countries, key=lambda c: c[1])  # sort by name, A-Z
        return [("ALL", _("Global"))] + countries

    def queryset(self, request, queryset):
        value = self.value()

        # "ALL" is special value used for showing global users (with empty country)
        if value == "ALL":
            value = ""

        if value is not None:
            return queryset.filter(**{self.parameter_name: value})

        return queryset


class DriveCountryFilter(CountryFilter):
    parameter_name = "driver__country"


class DriveResource(resources.ModelResource):
    country = Field(attribute="country")
    diff_mileage = Field(attribute="diff_mileage")
    fuel_consumption = Field(attribute="fuel_consumption")

    class Meta:
        model = Drive
        fields = (
            "id",
            "date",
            "country",
            "is_verified",
            "project__title",
            "description",
            "start_mileage",
            "end_mileage",
            "diff_mileage",
            "start_location",
            "end_location",
            "driver",
            "driver__country",
            "passenger",
            "car__plates",
            "fuel_consumption",
        )
        export_order = fields

    def dehydrate_driver(self, drive):
        return str(drive.driver)

    def dehydrate_driver__country(self, drive):
        return str(drive.driver.country.name)

    def dehydrate_passenger(self, drive):
        return str(drive.passenger)


@admin.register(Drive)
class DriveAdmin(ImportExportModelAdmin):
    resource_class = DriveResource
    list_filter = (DriveCountryFilter,)
    list_display = ("__str__", "country__name", "is_verified")

    def country__name(self, drive):
        return drive.country.name


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_filter = (CountryFilter,)
    list_display = ("__str__", "country")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_filter = (CountryFilter,)
    list_display = ("__str__", "country")


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_filter = ("groups", CountryFilter)
    list_display = (
        "username",
        "first_name",
        "last_name",
        "country",
        "is_staff",
        "last_seen",
    )

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            _("Personal info"),
            {"fields": ("first_name", "last_name", "email", "country")},
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_seen", "last_login", "date_joined")}),
    )
