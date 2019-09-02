# pah-fm

[![Build Status](https://travis-ci.com/CodeForPoznan/pah-fm.svg?branch=master)](https://travis-ci.com/CodeForPoznan/pah-fm)
[![Join the chat at https://gitter.im/CodeForPoznan/pah-fm](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CodeForPoznan/pah-fm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## How to use Make?

We use Make to make to manage running our project.
Run this command in terminal to see what Make commands are available:
```bash
make
```

## How to debug backend?
Run in terminal:
```bash
make debug-backend
```
After finishing debugging detach from shell using *CTRL*+`p` and *CTRL*+`q`.

## Initial admin credentials
We have 2 levels of admin users and 2 initial users - with and without Django Admin access:

username               | password | Django Admin access
---------------------- | -------- | -------------------
hello@codeforpoznan.pl | cfp123   | yes
ola@pah.org.pl         | pah123   | no


## API documentation
Available at `/api/docs/` URL.
Documentation is available only to logged-in users (DRF quirk).

## Install python modules locally
```bash
python3 -m venv ./backend/.venv
source ./backend/.venv/bin/activate
pip3 install -r requirements/dev.txt
```

Now pip modules are located in `backend/.venv/lib/python3.7/site-packages`. 

You can use them to check what is available in sources, and add it to your IDE for module resolution.
