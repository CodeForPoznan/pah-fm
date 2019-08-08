#!/usr/bin/env bash

bash wait-for-it db:5432

python3 manage.py migrate
python3 manage.py populate_database
python3 manage.py runserver 0.0.0.0:8000
