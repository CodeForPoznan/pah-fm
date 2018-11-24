build-backend:
	docker build -f backend/Dockerfile ./backend -t codeforpoznan/pah-fm-backend

build-frontend:
	docker build -f frontend/Dockerfile ./frontend -t codeforpoznan/pah-fm-frontend

# Build project
build:
	make build-backend
	make build-frontend

test-auth:
	curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"password123"}' http://localhost:8000/api/api-token-auth/

run-django:
	make manage CMD=runserver

manage:
	SECRET_KEY=pah-fm DJANGO_SETTINGS_MODULE=pah_fm.settings python3 backend/manage.py ${CMD}

test-backend-docker:
	docker-compose run --rm backend python3 manage.py test

lint-docker:
	make lint-frontend-docker
	make lint-backend-docker

lint-frontend-docker:
	docker-compose run --rm frontend npm run lint

lint-backend-docker:
	docker-compose run --rm backend pycodestyle --exclude='fleet_management/migrations/*' .

