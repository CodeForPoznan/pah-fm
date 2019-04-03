import random
import string
from datetime import timedelta

import factory
from django.utils.timezone import now
from factory import fuzzy

from fleet_management.models import (
    Car, Drive, Passenger, Project, User, VerificationToken,
)


class UserFactory(factory.DjangoModelFactory):

    class Meta:
        model = User

    first_name = factory.Faker('first_name', locale='uk_UA')
    last_name = factory.Faker('last_name', locale='uk_UA')
    email = factory.Faker('email', locale='uk_UA')
    username = factory.LazyAttribute(lambda obj: obj.email)

    is_active = True
    password = 'pass123'

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        manager = cls._get_manager(model_class)
        return manager.create_user(*args, **kwargs)


class CarFactory(factory.DjangoModelFactory):

    REGIONAL_PREFIXES = ('AA', 'KA', 'AB', 'KB', 'AC', 'KC', 'AE', 'KE', 'AH',
                         'KH', 'AI', 'KI', 'AK', 'KK', 'AM', 'KM', 'AO', 'KO',
                         'AP', 'KP', 'AT', 'KT', 'AX', 'KX', 'BA', 'HA', 'BB',
                         'HB', 'BC', 'HC', 'BE', 'HE', 'BH', 'HH', 'BI', 'HI',
                         'BK', 'HK', 'BM', 'HM', 'BO', 'HO', 'BP', 'HP', 'BT',
                         'HT', 'BX', 'HX', 'CA', 'IA', 'CB', 'IB', 'CC', 'IC',
                         'CE', 'IE', 'CH', 'IH', 'II')
    COLORS = ('white', 'black', 'silver', 'gray', 'brown', 'red', 'blue',
              'green')
    MODELS = {
        'Peugeot': ('108', '208', '301', '308', '408', '508', 'Bipper',
                    'Partner', 'Expert', 'Boxer'),
        'Citroen': ('C1', 'C3', 'C4', 'C5', 'DS 3', 'DS 4', 'DS 4S', 'DS 5',
                    'Berlingo', 'Jumper', 'Jumpy', 'Nemo'),
        'Suzuki': ('Alto', 'Baleno', 'Celerio', 'Lapin', 'Spacia', 'Swift',
                   'Carry', 'Jimny', 'Vitara', 'Every', 'Landy'),
        'Fiat': ('Panda', '500', 'Uno', 'Linea', 'Tipo', 'Doblò', 'Ducato',
                 'Fiorino', 'Qubo', 'Talento'),
        'Honda': ('Accord', 'Civic', 'Jazz', 'Insight', 'Inspire', 'Legend',
                  'Acty', 'Ridgeline', 'CR-V', 'HR-V', 'Acty', 'Freed',
                  'Odyssey'),
        'Ford': ('C-Max', 'Fiesta', 'Figo', 'Fusion', 'Mondeo', 'Focus', 'Ka',
                 'Ranger', 'Super Duty', 'Galaxy', 'S-Max', 'Transit'),
        'Hyundai': ('i10', 'i20', 'i30', 'Elantra', 'i40', 'Accent', 'Atos',
                    'Visto' 'Elantra', 'Eon', 'ix20', 'Cargo Truck', 'Porter',
                    'Xcient'),
        'Kia': ('Ceed', 'Cerato', 'Optima', 'Picanto', 'Quoris', 'Ray',
                'Stinger', 'Carens', 'Carnival', 'Venga', 'Besta', 'Bongo'),
        'Renault': ('Clio', 'Fluence', 'Mégane', 'Talisman', 'Twingo',
                    'Scénic', 'Captur', 'Espace', 'Kadjar', 'Kangoo',
                    'Trafic'),
        'Dacia': ('Logan', 'Sandero', 'Lodgy', 'Duster', 'Lodgy', 'Dokker'),
        'Nissan': ('Altima', 'Cima', 'Fuga', 'Almera', 'Leaf', 'Micra',
                   'Navara', 'Patrol', 'Juke', 'Murano', 'Pathfinder',
                   'Clipper', 'Cabstar', 'Atlas'),
        'Toyota': ('Auris', 'Aygo', 'Camry', 'Corolla', 'Prius', 'Yaris',
                   'Hilux', 'Land Cruiser', 'C-HR', 'RAV4', 'Avanza',
                   'Esquire', 'Estima', 'Innova', 'Pixis', 'Sienna', 'Dyna',
                   'ToyoAce'),
        'SEAT': ('Toledo', 'Ibiza', 'León', 'Mii', 'Alhambra', 'Arona',
                 'Ateca'),
        'Škoda': ('Citigo', 'Fabia', 'Octavia', 'Rapid', 'Superb', 'Kodiaq',
                  'Karoq'),
        'Volkswagen': ('Bora', 'Fox', 'Golf', 'Jetta', 'Passat', 'Polo', 'Up',
                       'Vento', 'Voyage', 'T-Roc', 'Tiguan', 'Touareg',
                       'Caddy', 'Sharan', 'Suran', 'Touran', 'Amarok',
                       'Saveiro', 'Transporter', 'Crafter'),
    }

    mileage_unit = fuzzy.FuzzyChoice(k for k, _ in Car.UNITS)
    fuel_consumption = fuzzy.FuzzyFloat(3, 10)

    class Meta:
        model = Car
        exclude = ('REGIONAL_PREFIXES', 'COLORS', 'MODELS')

    @factory.lazy_attribute
    def plates(self):
        return '{regional_prefix}{four_digits}{two_letters}'.format(
            regional_prefix=random.choice(self.REGIONAL_PREFIXES),
            four_digits=''.join(random.choices(string.digits, k=4)),
            two_letters=''.join(random.choices('ABEIKMHOPCTX', k=2)),
        )

    @factory.lazy_attribute
    def description(self):
        manufacturer = random.choice(list(self.MODELS.keys()))
        return '{color} {manufacturer} {model} {year}'.format(
            color=random.choice(self.COLORS).capitalize(),
            manufacturer=manufacturer,
            model=random.choice(self.MODELS[manufacturer]),
            year=random.randrange(1990, now().year),
        )


class PassengerFactory(factory.DjangoModelFactory):

    class Meta:
        model = Passenger

    first_name = factory.Faker('first_name', locale='pl_PL')
    last_name = factory.Faker('last_name', locale='pl_PL')


class ProjectFactory(factory.DjangoModelFactory):

    class Meta:
        model = Project

    title = factory.Faker('sentence', nb_words=4)
    description = factory.Faker('text', max_nb_chars=1000)

    @factory.post_generation
    def drives(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for drive in extracted:
                self.drives.add(drive)


class DriveFactory(factory.DjangoModelFactory):

    class Meta:
        model = Drive

    driver = factory.SubFactory(UserFactory)
    project = factory.SubFactory(ProjectFactory)
    car = factory.SubFactory(CarFactory)
    date = fuzzy.FuzzyDate((now() - timedelta(days=1000)).date())
    start_mileage = fuzzy.FuzzyInteger(1000000)
    description = factory.Faker('text', max_nb_chars=1000)

    @factory.lazy_attribute
    def end_mileage(self):
        return random.randint(self.start_mileage, 1000000)

    @factory.post_generation
    def passengers(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for passenger in extracted:
                self.passengers.add(passenger)


class VerificationTokenFactory(factory.DjangoModelFactory):

    comment = factory.Faker(
        'text', max_nb_chars=VerificationToken.COMMENT_MAX_LENGTH,
    )
    token = factory.Faker('uuid4')

    class Meta:
        model = VerificationToken
