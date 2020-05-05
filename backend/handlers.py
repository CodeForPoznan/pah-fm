import io

import django
from django.core.management import call_command

from serverless_wsgi import handle_request

from pah_fm.wsgi import application


django.setup()


def api(event, context):
    # event["headers"]["X-Forwarded-Host"] = "dev.pahfm.codeforpoznan.pl"
    return handle_request(application, event, context)


def migration(event, context):
    stdout, stderr = io.StringIO(), io.StringIO()
    call_command("migrate", "--no-color", stdout=stdout, stderr=stderr)
    return {
        "stdout": stdout.getvalue(),
        "stderr": stderr.getvalue(),
    }
