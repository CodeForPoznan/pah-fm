# pah-fm

[![Build Status](https://travis-ci.com/CodeForPoznan/pah-fm.svg?branch=master)](https://travis-ci.com/CodeForPoznan/pah-fm)

## Run project (in background)

```
make start
```

## Stop project
```
make stop
```

## Attach to logs
```
make logs
```

## Run linters
```
make lint
```

## Run tests
```
make test
```

## Debug backend (Django)
```
make debug-backend
```
After finishing debugging detach from shell using *CTRL*+`p` and *CTRL*+`q`.

## Initial admin credentials
We have 2 levels of admin users and 2 initial users - with and without Django Admin access:

username               | password | Django Admin access
---------------------- | -------- | -------------------
hello@codeforpoznan.pl | cfp123   | yes
ola@pah.org.pl         | pah123   | no
