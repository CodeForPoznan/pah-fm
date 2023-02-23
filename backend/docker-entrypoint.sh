#!/usr/bin/env bash

./manage.py wait_for_db
./manage.py migrate
./manage.py create_admin hello@codeforpoznan.pl pass123 UA --django-admin
./manage.py runserver 0.0.0.0:8000
