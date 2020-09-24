import string
from datetime import timedelta

import random

from django.utils.timezone import now
from factory import (
    fuzzy,
    DjangoModelFactory,
    Faker,
    LazyAttribute,
    lazy_attribute,
    SubFactory,
)

from djmoney.money import Money
from djmoney.settings import CURRENCY_CHOICES
from fleet_management.models import Car, Drive, Project, User, Refuel


COUNTRIES = ("UA", "SS")


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("username",)

    first_name = Faker("first_name", locale="uk_UA")
    last_name = Faker("last_name", locale="uk_UA")
    email = LazyAttribute(lambda obj: obj.username)
    username = Faker("email", locale="uk_UA")
    country = fuzzy.FuzzyChoice(COUNTRIES)

    is_active = True
    password = "pass123"

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        groups = kwargs.pop("groups", [])
        user = super()._create(model_class, *args, **kwargs)
        user.set_password(cls.password)
        for g in groups:
            user.groups.add(g)
        user.save()
        return user


class CarFactory(DjangoModelFactory):

    REGIONAL_PREFIXES = (
        "AA",
        "KA",
        "AB",
        "KB",
        "AC",
        "KC",
        "AE",
        "KE",
        "AH",
        "KH",
        "AI",
        "KI",
        "AK",
        "KK",
        "AM",
        "KM",
        "AO",
        "KO",
        "AP",
        "KP",
        "AT",
        "KT",
        "AX",
        "KX",
        "BA",
        "HA",
        "BB",
        "HB",
        "BC",
        "HC",
        "BE",
        "HE",
        "BH",
        "HH",
        "BI",
        "HI",
        "BK",
        "HK",
        "BM",
        "HM",
        "BO",
        "HO",
        "BP",
        "HP",
        "BT",
        "HT",
        "BX",
        "HX",
        "CA",
        "IA",
        "CB",
        "IB",
        "CC",
        "IC",
        "CE",
        "IE",
        "CH",
        "IH",
        "II",
    )
    COLORS = ("white", "black", "silver", "gray", "brown", "red", "blue", "green")
    MODELS = {
        "Peugeot": (
            "108",
            "208",
            "301",
            "308",
            "408",
            "508",
            "Bipper",
            "Partner",
            "Expert",
            "Boxer",
        ),
        "Citroen": (
            "C1",
            "C3",
            "C4",
            "C5",
            "DS 3",
            "DS 4",
            "DS 4S",
            "DS 5",
            "Berlingo",
            "Jumper",
            "Jumpy",
            "Nemo",
        ),
        "Suzuki": (
            "Alto",
            "Baleno",
            "Celerio",
            "Lapin",
            "Spacia",
            "Swift",
            "Carry",
            "Jimny",
            "Vitara",
            "Every",
            "Landy",
        ),
        "Fiat": (
            "Panda",
            "500",
            "Uno",
            "Linea",
            "Tipo",
            "Doblò",
            "Ducato",
            "Fiorino",
            "Qubo",
            "Talento",
        ),
        "Honda": (
            "Accord",
            "Civic",
            "Jazz",
            "Insight",
            "Inspire",
            "Legend",
            "Acty",
            "Ridgeline",
            "CR-V",
            "HR-V",
            "Acty",
            "Freed",
            "Odyssey",
        ),
        "Ford": (
            "C-Max",
            "Fiesta",
            "Figo",
            "Fusion",
            "Mondeo",
            "Focus",
            "Ka",
            "Ranger",
            "Super Duty",
            "Galaxy",
            "S-Max",
            "Transit",
        ),
        "Hyundai": (
            "i10",
            "i20",
            "i30",
            "Elantra",
            "i40",
            "Accent",
            "Atos",
            "Visto" "Elantra",
            "Eon",
            "ix20",
            "Cargo Truck",
            "Porter",
            "Xcient",
        ),
        "Kia": (
            "Ceed",
            "Cerato",
            "Optima",
            "Picanto",
            "Quoris",
            "Ray",
            "Stinger",
            "Carens",
            "Carnival",
            "Venga",
            "Besta",
            "Bongo",
        ),
        "Renault": (
            "Clio",
            "Fluence",
            "Mégane",
            "Talisman",
            "Twingo",
            "Scénic",
            "Captur",
            "Espace",
            "Kadjar",
            "Kangoo",
            "Trafic",
        ),
        "Dacia": ("Logan", "Sandero", "Lodgy", "Duster", "Lodgy", "Dokker"),
        "Nissan": (
            "Altima",
            "Cima",
            "Fuga",
            "Almera",
            "Leaf",
            "Micra",
            "Navara",
            "Patrol",
            "Juke",
            "Murano",
            "Pathfinder",
            "Clipper",
            "Cabstar",
            "Atlas",
        ),
        "Toyota": (
            "Auris",
            "Aygo",
            "Camry",
            "Corolla",
            "Prius",
            "Yaris",
            "Hilux",
            "Land Cruiser",
            "C-HR",
            "RAV4",
            "Avanza",
            "Esquire",
            "Estima",
            "Innova",
            "Pixis",
            "Sienna",
            "Dyna",
            "ToyoAce",
        ),
        "SEAT": ("Toledo", "Ibiza", "León", "Mii", "Alhambra", "Arona", "Ateca"),
        "Škoda": ("Citigo", "Fabia", "Octavia", "Rapid", "Superb", "Kodiaq", "Karoq"),
        "Volkswagen": (
            "Bora",
            "Fox",
            "Golf",
            "Jetta",
            "Passat",
            "Polo",
            "Up",
            "Vento",
            "Voyage",
            "T-Roc",
            "Tiguan",
            "Touareg",
            "Caddy",
            "Sharan",
            "Suran",
            "Touran",
            "Amarok",
            "Saveiro",
            "Transporter",
            "Crafter",
        ),
    }

    fuel_consumption = fuzzy.FuzzyFloat(3, 10)
    country = fuzzy.FuzzyChoice(COUNTRIES)

    class Meta:
        model = Car
        exclude = ("REGIONAL_PREFIXES", "COLORS", "MODELS")
        django_get_or_create = ("plates",)

    @lazy_attribute
    def plates(self):
        return "{regional_prefix}{four_digits}{two_letters}".format(
            regional_prefix=random.choice(self.REGIONAL_PREFIXES),
            four_digits="".join(random.choices(string.digits, k=4)),
            two_letters="".join(random.choices("ABEIKMHOPCTX", k=2)),
        )

    @lazy_attribute
    def description(self):
        manufacturer = random.choice(list(self.MODELS.keys()))
        return "{color} {manufacturer} {model} {year}".format(
            color=random.choice(self.COLORS).capitalize(),
            manufacturer=manufacturer,
            model=random.choice(self.MODELS[manufacturer]),
            year=random.randrange(1990, now().year),
        )


class ProjectFactory(DjangoModelFactory):
    class Meta:
        model = Project
        django_get_or_create = ("title",)

    title = Faker("text", max_nb_chars=50)
    description = Faker("text", max_nb_chars=1000)
    country = fuzzy.FuzzyChoice(COUNTRIES)


class DriveFactory(DjangoModelFactory):
    class Meta:
        model = Drive
        django_get_or_create = (
            "end_mileage",
            "start_mileage",
            "timestamp",
            "start_location",
            "end_location",
        )

    driver = SubFactory(UserFactory)
    project = SubFactory(ProjectFactory)
    passenger = SubFactory(UserFactory)
    car = SubFactory(CarFactory)
    date = fuzzy.FuzzyDate((now() - timedelta(days=1000)).date())
    start_mileage = fuzzy.FuzzyInteger(1, 1000)
    end_mileage = fuzzy.FuzzyInteger(1000, 9999)
    description = Faker("text", max_nb_chars=1000)
    timestamp = fuzzy.FuzzyInteger(1, 999999999)
    start_location = Faker("city", locale="uk_UA")
    end_location = Faker("city", locale="uk_UA")
    is_verified = fuzzy.FuzzyChoice((True, False))


class RefuelFactory(DjangoModelFactory):
    class Meta:
        model = Refuel

    driver = SubFactory(UserFactory)
    car = SubFactory(CarFactory)
    date = fuzzy.FuzzyDate((now() - timedelta(days=1000)).date())
    current_mileage = fuzzy.FuzzyInteger(1, 1000)
    refueled_liters = fuzzy.FuzzyInteger(1, 1000)
    price_per_liter = fuzzy.FuzzyInteger(1, 1000)
    currency = Money(
        currency=random.choice(CURRENCY_CHOICES)[0], amount=round(random.random(), 2)
    )
