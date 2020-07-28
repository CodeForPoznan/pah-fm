#!/usr/bin/env bash

bash wait-for-it db:5432

python3 manage.py migrate
python3 manage.py create_admin hello@codeforpoznan.pl pass123 UA --django-admin
python3 manage.py create_admin ola@pah.org.pl pass123 UA
python3 manage.py runserver 0.0.0.0:8000
