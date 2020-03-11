from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field
from import_export import resources
from .models import Car, Drive, User, Project


class CountryFilter(admin.SimpleListFilter):
    title = _('Country')
    parameter_name = 'country'

    def lookups(self, request, model_admin):
        return set([
            (obj.country, obj.country.name) for obj in model_admin.model.objects.exclude(
                country__isnull=True
            ).exclude(country__exact='')
        ])

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(country=self.value())
        else:
            return queryset


class DriveResource(resources.ModelResource):

    def dehydrate_driver(self, drive):
        return str(drive.driver)

    def dehydrate_driver__country(self, drive):
        return str(drive.driver.country.name)

    def dehydrate_passenger(self, drive):
        return str(drive.passenger)

    fuel_consumption = Field(attribute="fuel_consumption")
    diff_mileage = Field(attribute="diff_mileage")
    country = Field(attribute="country")

    class Meta:
        model = Drive
        fields = (
            "id",
            "date",
            "country",
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


class DriveAdmin(ImportExportModelAdmin):
    resource_class = DriveResource
    list_filter = ("driver__country",)
    list_display = ("__str__", "country", "is_verified")


class CarAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'country')
    list_filter = (CountryFilter,)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'country')
    list_filter = (CountryFilter,)


class CustomUserAdmin(UserAdmin):
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
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', CountryFilter,)


admin.site.register(Car, CarAdmin)
admin.site.register(Drive, DriveAdmin)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Project, ProjectAdmin)
