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
	docker-compose run --rm --no-deps backend pycodestyle --exclude='fleet_management/migrations/*' .

lint-frontend:
	docker-compose run --rm --no-deps frontend npm run lint

lint:
	make lint-frontend
	make lint-backend

test-backend:
	make manage CMD=test

test:
	make test-backend

bash-backend:
	docker-compose exec -ti backend bash

debug-backend:
	docker attach `docker-compose ps -q backend`

manage:
	docker-compose run --rm --no-deps backend python3 manage.py ${CMD}

populate-database:
	make manage CMD=populate_database

deploy-backend-heroku:
	git subtree push --prefix backend/ heroku-backend master

deploy-frontend-heroku:
	docker-compose run --rm --no-deps frontend npm run build:heroku
	cd ./frontend && npm run deploy:heroku
