# pah-fm

[![Build Status](https://travis-ci.com/CodeForPoznan/pah-fm.svg?branch=master)](https://travis-ci.com/CodeForPoznan/pah-fm)
[![Join the chat at https://gitter.im/CodeForPoznan/pah-fm](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CodeForPoznan/pah-fm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


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

## Deployment
Dev deployment is done manually by Jacek @jacol12345 (or @jacekbj - same person, different alias).

Backend runs on Heroku free plan.
It is painfully slow and needs to warm up.
```
make deploy-backend-heroku
```

Frontend is deployed to Firebase:
```
make deploy-frontend-heroku
```

Links:
https://pah-backend.herokuapp.com/admin/  - admin
https://pah-backend.herokuapp.com/api/  - API
https://pah-fm.firebaseapp.com  - frontend

## API documentation
Available at `/api/docs/` URL.
Documentation is available only to logged-in users (DRF quirk).
