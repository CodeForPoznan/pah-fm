.DEFAULT_GOAL:=help

%: # skip unknown commands
	@:

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} \
	 /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%17s\033[0m  %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

	@echo
	@echo "   not sure which one to pick? check out README.md"
	@[[ `docker-compose ps --services --status running | wc -l | xargs` = 4 ]] \
		&& echo "🟢 project is running, head out to http://localhost:8000/" \
		|| echo "⚪ project is stopped, try running 'make start'"
	@echo

start:  ## Start all containers in background
	docker-compose up --detach

stop:  ## Stop all containers
	docker-compose stop

build:  ## Build backend & frontend containers
	make build-backend
	make build-frontend
	make build-frontend-react

clean:  ## Clean all caches
	docker-compose down --volumes --rmi all --remove-orphans
	-rm -r backend/.venv
	-rm -r backend/__pycache__
	-rm -r frontend/node_modules
	-rm -r frontend-react/node_modules

logs:  ## Attach to logs
	docker-compose logs --tail 100 --follow

lint:  ## Run linters
	make lint-frontend
	make lint-backend

test:  ## Run tests
	make test-frontend
	make test-backend

manage:  ## Use manage.py, i.e make manage populate_database
	docker-compose exec backend ./manage.py $(filter-out $@,$(MAKECMDGOALS))

build-frontend:  ## Build frontend container
	docker build --tag codeforpoznan/pah-fm-frontend frontend
	docker build --tag codeforpoznan/pah-fm-frontend-react frontend-react

build-backend:  ## Build backend container
	docker build --tag codeforpoznan/pah-fm-backend backend

lint-frontend:  ## Run linters on frontend container
	docker-compose exec frontend npm run lint:fix
	docker-compose exec frontend-react yarn run lint:fix

lint-backend:  ## Run linters on backend container
	# we need to cd to upper directory for consistency with github actions
	docker-compose exec backend sh -c 'cd .. && isort --profile black backend'
	docker-compose exec backend black .

test-frontend: ## Run tests on frontend container
	docker-compose exec frontend npm run test
	# docker-compose exec frontend-react yarn run test

test-backend:  ## Run tests on backend container
	docker-compose exec backend ./manage.py test

bash-frontend:  ## Enter frontend container
	docker-compose exec frontend bash

bash-backend:  ## Enter backend container
	docker-compose exec backend bash

debug-backend:  ## Debug backend container (Django)
	docker attach `docker-compose ps -q backend`

populate-database:  ## Populate database with test data
	make manage populate_database

# AWS Lambda
pack-backend:
	7z a ../lambda.zip ./.venv/lib/python*/site-packages/*
	7z a ../lambda.zip -xr'!.venv' migrations ../backend

pack-frontend:
	npm run build -- --dest ../public
