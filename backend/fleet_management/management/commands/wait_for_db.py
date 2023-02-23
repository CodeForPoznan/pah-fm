from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError
from time import sleep


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        timeout = 15 # seconds
        self.stdout.write('waiting for db ...')

        for t in range(timeout):
            try:
                _ = connections['default']
                self.stdout.write(self.style.SUCCESS(f"db available after {t} seconds"))
                break

            except OperationalError:
                self.stdout.write("Database unavailable, waiting ...")
                sleep(1)
        else:
            raise RuntimeError(f"Error: Database is unavailable after {timeout} seconds")