from django.contrib import admin

from .models import Car, Passenger, Drive, User, Project, VerificationToken


admin.site.register(Car)
admin.site.register(Passenger)
admin.site.register(Drive)
admin.site.register(User)
admin.site.register(Project)


@admin.register(VerificationToken)
class VerificationTokenAdmin(admin.ModelAdmin):
    readonly_fields = ('token', )
