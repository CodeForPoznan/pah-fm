from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from fleet_management.models import Car, Drive, Project, Refuel, User
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field


class CountryFilter(admin.SimpleListFilter):
    title = _("Country")
    parameter_name = "country"

    def get_parameter(self, obj):
        for part in self.parameter_name.split("__"):
            obj = getattr(obj, part)
        return obj

    def lookups(self, request, model_admin):
        objects = model_admin.model.objects.distinct(self.parameter_name)
        countries = [self.get_parameter(o) for o in set(objects)]
        countries = [(c.code, c.name) for c in countries]
        countries.sort(key=lambda c: c[1])  # sort by name, A-Z
        return [("ALL", _("Global"))] + countries

    def queryset(self, request, queryset):
        value = self.value()

        # no query was applied, skip filtering
        if value is None:
            return queryset

        # "ALL" is special value used for showing
        # global users (those with empty country)
        if value == "ALL":
            value = ""

        return queryset.filter(**{self.parameter_name: value})


class CarCountryFilter(CountryFilter):
    parameter_name = "car__country"


class DriveResource(resources.ModelResource):
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
            "passenger",
            "car__plates",
            "fuel_consumption",
        )
        export_order = fields

    def dehydrate_country(self, drive):
        return str(drive.country.name)

    def dehydrate_driver(self, drive):
        return str(drive.driver)

    def dehydrate_passenger(self, drive):
        return str(drive.passenger)


@admin.register(Drive)
class DriveAdmin(ImportExportModelAdmin):
    resource_class = DriveResource
    list_filter = (CountryFilter,)
    list_display = (
        "date",
        "start_location",
        "end_location",
        "driver",
        "passenger",
        "country",
        "is_verified",
    )


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_filter = (CountryFilter,)
    list_display = ("plates", "description", "fuel_consumption", "country")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_filter = (CountryFilter,)
    list_display = ("title", "country")


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


@admin.register(Refuel)
class RefuelAdmin(admin.ModelAdmin):
    list_filter = (
        "driver",
        "car",
        CarCountryFilter,
    )
    list_display = (
        "driver",
        "car",
        "car__country",
        "date",
        "current_mileage",
        "refueled_liters",
        "price_per_liter",
        "total_cost",
    )

    def car__country(self, refuel):
        return refuel.car.country.name
