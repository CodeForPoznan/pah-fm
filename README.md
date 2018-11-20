# pah-fm


# Build project

```
make build
```

# Run project

```
docker-compose up
```

# Run project locally for testing
```
docker-compose up -d db

virtualenv env -p /usr/local/bin/python3
source env/bin/activate

pip install -r backend/requirements/dev.txt

make manage CMD=createsuperuser
```

## Initial admin credentials
We have 2 levels of admin users and 2 initial users - with and without Django Admin access:

username               | password | Django Admin access
---------------------- | -------- | -------------------
hello@codeforpoznan.pl | cfp123   | yes
ola@pah.org.pl         | pah123   | no
