# Docker-compose Development commands

init:
	@docker-compose -f docker-compose-dev.yml up --force-recreate --renew-anon-volumes
rebuild:
	@docker-compose -f docker-compose-dev.yml build --no-cache
dev:
	@docker-compose -f docker-compose-dev.yml up
logs:
	@docker-compose -f docker-compose-dev.yml logs -f
restart:
	@docker-compose -f docker-compose-dev.yml down
	@docker-compose -f docker-compose-dev.yml build --no-cache
	@docker-compose -f docker-compose-dev.yml up --force-recreate --renew-anon-volumes
down:
	@docker-compose -f docker-compose-dev.yml down

use-docker-context:
	@docker context use default


# Docker-compose Production commands

# init deployment by creating new aws ecs context
create-deploy-context:
	@docker context create ecs ecs-context --from-env

# build prod image
prod-build:
	@docker-compose -f docker-compose-prod.yml --profile credit-card build --no-cache

# push to registry prod image
prod-push:
	@aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 537583533687.dkr.ecr.eu-west-1.amazonaws.com
	@docker-compose -f docker-compose-prod.yml --profile credit-card push

# crate or update prod infrastructure
prod-create-infra:
	@docker context use ecs-context
#@aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 537583533687.dkr.ecr.eu-west-1.amazonaws.com
	@docker compose -f docker-compose-deploy-prod.yml --profile credit-card --project-name services-cc up
	@docker context use default

# NPM commands

install:
	npm install
lint: install
	npm run lint
format: install
	npm run format
build: install
	npm run build
precommit: install
	npm run precommit
test: install
	npm test

