from django.apps import AppConfig


class FleetManagementConfig(AppConfig):
    name = 'fleet_management'

    def ready(self):
        from .signals import *
