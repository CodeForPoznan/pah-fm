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
