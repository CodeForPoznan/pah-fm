#!/usr/bin/env bash
wait-for-it.sh db 5432
python3 manage.py runserver 0.0.0.0:8000

