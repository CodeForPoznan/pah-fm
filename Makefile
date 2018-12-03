start:
	docker-compose up -d

stop:
	docker-compose stop

logs:
	docker-compose logs -f

build-backend:
	docker build ./backend -t codeforpoznan/pah-fm-backend

build-frontend:
	docker build ./frontend -t codeforpoznan/pah-fm-frontend

build:
	make build-backend
	make build-frontend

lint-backend:
	docker-compose run --rm backend pycodestyle --exclude='fleet_management/migrations/*' .

lint-frontend:
	docker-compose run --rm frontend npm run lint

lint:
	make lint-frontend
	make lint-backend

test-backend:
	docker-compose run --rm backend python3 manage.py test

test:
	make test-backend

bash-backend:
	docker-compose exec -ti backend bash

debug-backend:
	docker attach `docker-compose ps -q backend`
