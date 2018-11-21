#!/usr/bin/env bash

bash wait-for-it db:5432

python3 manage.py migrate
python3 manage.py create_admin hello@codeforpoznan.pl cfp123 --django-admin
python3 manage.py create_admin ola@pah.org.pl pah123
python3 manage.py runserver 0.0.0.0:8000
