import os
import datetime

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Base URL without trailing slash
BASE_URL = os.environ.get("BASE_URL")
SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = os.environ.get("DEBUG", "0") == "1"

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "52.232.62.212",
    ".pahfm.codeforpoznan.pl",
    ".execute-api.eu-west-1.amazonaws.com",
]

USE_X_FORWARDED_HOST = True

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_DOMAIN = BASE_URL

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "import_export",
    # 3rd party apps
    "corsheaders",
    "rest_framework",
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

CORS_ORIGIN_WHITELIST = ("localhost:8080", "127.0.0.1:8080")

ROOT_URLCONF = "pah_fm.urls"

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

WSGI_APPLICATION = "pah_fm.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

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


# DRF settings

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_jwt.authentication.JSONWebTokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
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


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation"
        ".UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# Custom user model

AUTH_USER_MODEL = "fleet_management.User"


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

if os.environ.get("S3_BUCKET") and os.environ.get("S3_KEY"):
    STATICFILES_STORAGE = "django_s3_storage.storage.StaticS3Storage"
    S3_BUCKET = os.environ.get("S3_BUCKET")
    S3_KEY = os.environ.get("S3_KEY")

    AWS_S3_BUCKET_NAME_STATIC = S3_BUCKET
    AWS_S3_CUSTOM_DOMAIN = f"{S3_BUCKET}.s3.amazonaws.com"
    STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{S3_KEY}"
else:
    STATIC_URL = "/static/"
    STATIC_ROOT = os.path.join(BASE_DIR, "static")
    STATICFILES_DIRS = [os.path.join(BASE_DIR, "pah_fm/static")]

# Email settings
EMAIL_HOST = "localhost"
EMAIL_PORT = 25
EMAIL_USE_TLS = False
EMAIL_ADDRESS = "hello@cfp.com"

if DEBUG:
    EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
    EMAIL_FILE_PATH = os.path.join(BASE_DIR, "emails")

# verify if it's required for registering user
AUTHENTICATION_BACKENDS = ("django.contrib.auth.backends.AllowAllUsersModelBackend",)

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"

JWT_AUTH = {
    "JWT_EXPIRATION_DELTA": datetime.timedelta(days=30),
}

RSA_PUBLIC_EXP = 257
RSA_BIT_LENGTH = 19
