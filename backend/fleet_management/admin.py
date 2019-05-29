from import_export import resources
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from import_export.admin import ImportExportModelAdmin

from .models import Car, Passenger, Drive, User, Project, VerificationToken

class DriveResource(resources.ModelResource):
    class Meta:
        model = Drive
        fields = ("id", "driver__username")

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
