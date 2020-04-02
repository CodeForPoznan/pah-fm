.DEFAULT_GOAL:=help

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} \
	 /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%17s\033[0m  %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

start:  ## Start all containers in background
	docker-compose up --detach

stop:  ## Stop all containers
	docker-compose stop ${CONTAINER}

build:  ## Build backend & frontend containers
	make build-backend
	make build-frontend

adminer: ## run database adminer
	docker run -d -p 8082:8080 --network="pah" adminer

remove:  ## Stop and remove backend & frontend containers
	make remove-backend
	make remove-frontend

rebuild:  ## Rebuid application
	docker-compose down
	make remove-backend
	make remove-frontend
	make build
	make start

rebuild-docker-images:  ## Rebuid backend & frontend containers
	make remove
	make build

logs:  ## Attach to logs
	docker-compose logs --tail 100 --follow

lint:   ## Run linters
	make lint-frontend
	make lint-backend

test:  ## Run tests
	make test-frontend
	make test-backend

manage:  ## Use manage.py, i.e make manage CMD=collectstatic
	docker-compose run --rm --no-deps backend python3 manage.py ${CMD}

build-backend:  ## Build backend container
	docker-compose stop backend
	docker build --tag codeforpoznan/pah-fm-backend backend

build-frontend:  ## Build frontend container
	docker-compose stop frontend || true
	docker build --tag codeforpoznan/pah-fm-frontend frontend

remove-backend:  ## Stop and remove backend container
	docker-compose rm -v --stop --force backend

remove-frontend:  ## Stop and remove frontend container
	docker-compose rm -v --stop --force frontend

lint-backend:  ## Run linters on backend container
	docker-compose run --rm --no-deps backend flake8 .

lint-frontend:  ## Run linters on frontend container
	docker-compose run --rm --no-deps frontend npm run lint:fix

test-frontend: ## Run tests on frontend container
	docker-compose run --rm --no-deps frontend npm run test

test-backend:  ## Run tests on backend container
	make manage CMD=test

bash-backend:  ## Enter backend container
	docker-compose exec backend bash

bash-frontend:  ## Enter frontend container
	docker-compose exec frontend bash

debug-backend:  ## Debug backend container (Django)
	docker attach `docker-compose ps -q backend`

populate-database:  ## Populate database with factory based data
	make manage CMD=populate_database

checkout:  ## Checkout to existing branch and start clean app, i.e. make checkout BRANCH=develop
	@test "${BRANCH}" || make help | grep " $@ "
	@test "${BRANCH}" # fail if variable is not set

	git fetch --all
	git checkout ${BRANCH}
	make rebuild
	docker-compose rm -v --stop --force db
	make start
	docker-compose exec backend wait-for-it localhost:8000
	make populate-database
	@echo "Complete! Go to http://localhost:8080 and work!"

checkout-pr:  ## Checkout to Pull Request, i.e. make checkout-pr PR=150
	@test "${PR}" || make help | grep " $@ "
	@test "${PR}" # fail if variable is not set

	git fetch upstream pull/${PR}/head:${PR}
	make checkout BRANCH=${PR}
