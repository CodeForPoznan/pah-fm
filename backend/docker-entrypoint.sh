#!/usr/bin/env bash

wait-for-it db:5432

./manage.py migrate
./manage.py create_admin hello@codeforpoznan.pl pass123 UA --django-admin
./manage.py runserver 0.0.0.0:8000
