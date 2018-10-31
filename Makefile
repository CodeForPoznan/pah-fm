# Build project
build:
	docker build -f frontend/Dockerfile ./frontend -t codeforpoznan/pah-fm-frontend
	docker build -f backend/Dockerfile ./backend -t codeforpoznan/pah-fm-backend

test_auth:
	curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"password123"}' http://localhost:8000/api-token-auth/
