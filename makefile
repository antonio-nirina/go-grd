.PHONY: help
DOCKER_COMPOSE=docker-compose
DOCKER_COMPOSE_EXEC=$(DOCKER_COMPOSE) exec


help: ## Command you can use
	@echo "\033[0;32mhello"
# @awk 'BEGIN ' $(MAKEFILE_LIST)

##Docker
build_g: ## build docker
	$(DOCKER_COMPOSE) build --force-rm

start_g: ## start container
	$(DOCKER_COMPOSE) up 

stop_g: ## Stop containers docker
	$(DOCKER_COMPOSE) down

ssh-go: ## Connexion container Golang
	$(PHP_DOCKER_COMPOSE_EXEC) bash