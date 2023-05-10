import datetime
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_URL = os.environ.get("BASE_URL")
SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = os.environ.get("DEBUG", "0") == "1"

ALLOWED_HOSTS = [
    "localhost",
    "52.232.62.212",
    ".pahfm.codeforpoznan.pl",
    ".execute-api.eu-west-1.amazonaws.com",
]

ROOT_URLCONF = "pah_fm.urls"
WSGI_APPLICATION = "pah_fm.wsgi.application"
AUTH_USER_MODEL = "fleet_management.User"
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True
MEDIA_URL = "/media/"
STATIC_URL = "/static/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_DIRS = [os.path.join(BASE_DIR, "pah_fm/static")]
API_TOKEN_LIFETIME = datetime.timedelta(days=30)

RSA_PUBLIC_EXP = 257
RSA_BIT_LENGTH = 19

USE_X_FORWARDED_HOST = True
SESSION_COOKIE_SAMESITE = None
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_HTTPONLY = not DEBUG
CSRF_COOKIE_DOMAIN = BASE_URL
CSRF_TRUSTED_ORIGINS = [f"http://{BASE_URL}"]
CORS_ORIGIN_WHITELIST = (
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:8090",
)

EMAIL_HOST = "localhost"
EMAIL_PORT = 25
EMAIL_USE_TLS = False
EMAIL_ADDRESS = "hello@codeforpoznan.pl"

if DEBUG:
    EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
    EMAIL_FILE_PATH = os.path.join(BASE_DIR, "emails")

INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.admindocs",
    "django.contrib.admin",
    # 3rd party apps
    "import_export",
    "corsheaders",
    "djmoney",
    "rest_framework",
    "rest_framework_simplejwt",
    # local apps
    "fleet_management",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "fleet_management.middleware.UpdateLastSeenMiddleware",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "USER": os.environ.get("PAH_FM_DB_USER", "pah-fm"),
        "NAME": os.environ.get("PAH_FM_DB_NAME", "pah-fm"),
        "PASSWORD": os.environ.get("PAH_FM_DB_PASS", "pah-fm"),
        "HOST": os.environ.get("PAH_FM_DB_HOST", "localhost"),
        "PORT": os.environ.get("PAH_FM_DB_PORT", "5432"),
    }
}

AUTHENTICATION_BACKENDS = ("django.contrib.auth.backends.AllowAllUsersModelBackend",)
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation"
        ".UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_RENDERER_CLASSES": (
        "djangorestframework_camel_case.render.CamelCaseJSONRenderer",
    ),
    "DEFAULT_PARSER_CLASSES": (
        "djangorestframework_camel_case.parser.CamelCaseJSONParser",
    ),
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
}

# we need to support both:
# (JWT, Sliding)  => legacy vuejs option
# Bearer, Access) => current reactjs option

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": API_TOKEN_LIFETIME,
    "REFRESH_TOKEN_LIFETIME": API_TOKEN_LIFETIME,
    "SLIDING_TOKEN_LIFETIME": API_TOKEN_LIFETIME,
    "SLIDING_TOKEN_REFRESH_LIFETIME": API_TOKEN_LIFETIME,
    "AUTH_HEADER_TYPES": ("Bearer", "JWT"),
    "AUTH_TOKEN_CLASSES": (
        "rest_framework_simplejwt.tokens.AccessToken",
        "rest_framework_simplejwt.tokens.SlidingToken",
    ),
}
