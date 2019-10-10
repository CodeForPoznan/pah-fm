#!/usr/bin/env bash

# apply migrations
bash wait-for-it db:5432
python3 manage.py migrate

# create default users for development
python3 manage.py create_user               \
    --username   hello@codeforpoznan.pl     \
    --first_name Admin                      \
    --last_name  Istrator                   \
    --password   cfp123                     \
    --country    UA                         \
    --is_admin   True                       \

python3 manage.py create_user               \
    --username   ola@pah.org.pl             \
    --first_name Ola                        \
    --last_name  PAH                        \
    --password   pah123                     \
    --country    UA                         \
    --is_admin   True                       \

python3 manage.py create_user               \
    --username   driver@codeforpoznan.pl    \
    --password   cfp123                     \
    --first_name Robert                     \
    --last_name  Kubica                     \
    --country    PL                         \
    --group      Driver                     \

python3 manage.py create_user               \
    --username   passenger@codeforpoznan.pl \
    --first_name Jakub                      \
    --last_name  Gerber                     \
    --password   cfp123                     \
    --country    UA                         \
    --group      Passenger                  \

# start the app
python3 manage.py runserver 0.0.0.0:8000
