from django.contrib import admin

from .models import Car, Passenger, Drive, User, Project, VerificationToken


admin.site.register(Car)
admin.site.register(Passenger)
admin.site.register(Drive)
admin.site.register(User)
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
