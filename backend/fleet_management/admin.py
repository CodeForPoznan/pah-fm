from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field
from import_export import resources
from .models import Car, Passenger, Drive, User, Project, VerificationToken


class DriveResource(resources.ModelResource):

    def dehydrate_driver(self, drive):
        return f"{drive.driver.first_name} {drive.driver.last_name}"

    def dehydrate_passengers(self, drive):
        return "/".join(
            "{} {}".format(passanger.first_name, passanger.last_name)
            for passanger in drive.passengers.all()
        )

    def dehydrate_driver__country(self, drive):
        return drive.driver.country.name

    fuel_consumption = Field(attribute='fuel_consumption')

    class Meta:
        model = Drive
        fields = (
            "id",
            "passengers",
            "date",
            "start_mileage",
            "end_mileage",
            "description",
            "start_location",
            "end_location",
            "driver",
            "driver__country",
            "fuel_consumption",
            "car__plates",
            "project__title",
        )

        export_order = fields


class DriveAdmin(ImportExportModelAdmin):
    resource_class = DriveResource


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (
            _('Personal info'),
            {'fields': ('first_name', 'last_name', 'email', 'country')},
        ),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions',
                )
            },
        ),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )


admin.site.register(Car)
admin.site.register(Passenger)
admin.site.register(Drive, DriveAdmin)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Project)


@admin.register(VerificationToken)
class VerificationTokenAdmin(admin.ModelAdmin):
    def is_active(self, instance):
        return instance.is_active

    def driver(self, instance):
        return instance.drive.driver.get_full_name()

    is_active.boolean = True

    readonly_fields = ('token',)
    list_display = (
        'passenger',
        'driver',
        'is_confirmed',
        'is_ok',
        'is_active',
        'created_at',
    )
    ordering = ('created_at',)
