.DEFAULT_GOAL:=help

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

start:  ## Run project (in background)
	docker-compose up -d

stop:  ## Stop project
	docker-compose stop

logs:  ## Attach to logs
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

lint:   ## Run linters
	make lint-frontend
	make lint-backend

test-backend:
	make manage CMD=test

test:  ## Run tests
	make test-backend

bash-backend:
	docker-compose exec -ti backend bash

debug-backend:  ## Debug backend (Django)
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

checkout:  ## Checkout to branch and start clean app, i.e. make checkout BRANCH=master
	git fetch -a
	git fetch upstream -a
	git checkout ${BRANCH}
	make rebuild
	docker-compose stop db 2>/dev/null
	docker-compose rm -fv db 2>/dev/null
	docker-compose up -d
	docker-compose exec backend wait-for-it localhost:8000
	make populate-database
	@echo "Complete! Go to localhost:8080 and work!"

checkout-pr:  ## Checkout to Pull Request, i.e. make checkout-pr PR=150
	git fetch upstream pull/${PR}/head:${PR}
	make checkout BRANCH=${PR}
