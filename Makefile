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

rebuild:
	@echo "Rebuilding frontend and backend..."
	docker-compose stop backend frontend 2>/dev/null
	docker-compose rm -fv backend frontend 2>/dev/null
	make build-backend
	make build-frontend
	@echo "Complete! Run 'docker-compose up -d' to start containers!"

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

test-behave:
	xhost +si:localuser:root
	docker-compose exec behave behave --tags=-skip
	xhost -si:localuser:root

bash-backend:
	docker-compose exec -ti backend bash

debug-backend:
	docker attach `docker-compose ps -q backend`

manage:
	docker-compose run --rm --no-deps backend python3 manage.py ${CMD}

populate-database:
	make manage CMD=populate_database

manage-heroku:
	heroku run --remote heroku-backend python manage.py ${CMD}

deploy-backend-heroku:
	git subtree push --prefix backend/ heroku-backend master

deploy-backend-heroku-force:
	git push heroku-backend `git subtree split --prefix backend ${BRANCH}`:master --force

deploy-frontend-heroku:
	docker-compose run --rm --no-deps frontend npm run build:heroku
	cd ./frontend && npm run deploy:heroku

send-test-email-heroku:
	make manage-heroku CMD="send_test_mail ${EMAIL}"
