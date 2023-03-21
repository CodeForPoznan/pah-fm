.DEFAULT_GOAL:=help

%: # skip unknown commands
	@:

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} \
	 /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%17s\033[0m  %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

start:  ## Start all containers in background
	docker-compose up --detach

stop:  ## Stop all containers
	docker-compose stop

build:  ## Build backend & frontend containers
	make build-backend
	make build-frontend
	make build-frontend-react

remove:  ## Stop and remove backend & frontend containers
	make remove-backend
	make remove-frontend

rebuild:  ## Rebuid application
	make stop
	make remove
	make build

clean:  ## Clean all caches
	make stop
	make remove
	-rm -r backend/__pycache__
	-rm -r frontend/node_modules
	-rm -r frontend-react/node_modules

logs:  ## Attach to logs
	docker-compose logs --tail 100 --follow

lint:   ## Run linters
	make lint-frontend
	make lint-backend

test:  ## Run tests
	make test-frontend
	make test-backend

manage:  ## Use manage.py, i.e make manage populate_database
	docker-compose exec backend ./manage.py $(filter-out $@,$(MAKECMDGOALS))

build-frontend:  ## Build frontend container
	docker-compose stop frontend
	docker build --tag codeforpoznan/pah-fm-frontend frontend

build-frontend-react:  ## Build frontend container
	docker-compose stop frontend-react
	docker build --tag codeforpoznan/pah-fm-frontend-react frontend-react

remove-frontend:  ## Stop and remove frontend container
	docker-compose rm -v --stop --force frontend

lint-frontend:  ## Run linters on frontend container
	docker-compose exec frontend npm run lint:fix

test-frontend: ## Run tests on frontend container
	docker-compose exec frontend npm run test

bash-frontend:  ## Enter frontend container
	docker-compose exec frontend bash

build-backend:  ## Build backend container
	docker-compose stop backend
	docker build --tag codeforpoznan/pah-fm-backend backend

remove-backend:  ## Stop and remove backend container
	docker-compose rm -v --stop --force backend

lint-backend:  ## Run linters on backend container
	# we need to cd to upper directory for consistency with github actions
	docker-compose exec backend sh -c 'cd .. && isort --profile black backend'
	docker-compose exec backend black .

test-backend:  ## Run tests on backend container
	make manage test

bash-backend:  ## Enter backend container
	docker-compose exec backend bash

debug-backend:  ## Debug backend container (Django)
	docker attach `docker-compose ps -q backend`