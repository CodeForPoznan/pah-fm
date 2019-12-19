from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field
from import_export import resources
from .models import Car, Drive, User, Project


class DriveResource(resources.ModelResource):
    def dehydrate_passenger(self, drive):
        return str(drive.passenger)

    def dehydrate_driver(self, drive):
        return str(drive.driver)  # required, because import-export prints PK by default

    def dehydrate_driver__country(self, drive):
        return drive.driver.country.name

    fuel_consumption = Field(attribute='fuel_consumption')
    diff_mileage = Field(attribute='diff_mileage')

    class Meta:
        model = Drive
        fields = (
            "id",
            "passenger",
            "date",
            "start_mileage",
            "end_mileage",
            "diff_mileage",
            "description",
            "start_location",
            "end_location",
            "driver",
            "driver__country",
            "fuel_consumption",
            "car__plates",
            "project__title",
            "country",
        )
        export_order = fields


class DriveAdmin(ImportExportModelAdmin):
    resource_class = DriveResource
    list_filter = ('driver__country', )
    list_display = ('__str__', 'country',)


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


admin.site.register(Car)
admin.site.register(Drive, DriveAdmin)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Project)
