from import_export import resources
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field


from .models import Car, Passenger, Drive, User, Project, VerificationToken


class DriveResource(resources.ModelResource):
    def dehydrate_passengers(self, drive):
        return "/".join("{} {}".format(
            p.first_name, p.last_name) for p in drive.passengers.all()
        )

    fuel_consumption_per_drive = Field(attribute='fuel_consumption_per_drive')

    class Meta:
        model = Drive
        fields = (
            "id",
            "passengers",
            "date",
            "start_mileage",
            "end_mileage",
            "fuel_consumption_per_drive",
            "description",
            "start_location",
            "end_location",
            "driver__first_name",
            "driver__last_name",
            "car__plates",
            "project__title",
        )

        export_order = fields


class DriveAdmin(ImportExportModelAdmin):
    resource_class = DriveResource


admin.site.register(Car)
admin.site.register(Passenger)
admin.site.register(Drive, DriveAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Project)


@admin.register(VerificationToken)
class VerificationTokenAdmin(admin.ModelAdmin):

    def is_active(self, instance):
        return instance.is_active

    def driver(self, instance):
        return instance.drive.driver.get_full_name()

    is_active.boolean = True

    readonly_fields = ('token', )
    list_display = ('passenger', 'driver', 'is_confirmed', 'is_ok', 'is_active', 'created_at')
    ordering = ('created_at',)
