import io
import os

import django
from django.core.management import call_command


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pah_fm.settings')
django.setup()


def migration(event, context):
    stdout, stderr = io.StringIO(), io.StringIO()
    call_command("migrate", "--no-color", stdout=stdout, stderr=stderr)
    return {
        "stdout": stdout.getvalue(),
        "stderr": stderr.getvalue(),
    }
