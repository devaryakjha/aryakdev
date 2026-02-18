PROJECT ?= $(CF_PAGES_PROJECT)
BRANCH ?= main

.PHONY: build deploy

build:
	bun run build

deploy:
	@if [ -z "$(PROJECT)" ]; then \
		echo "Missing Cloudflare Pages project name."; \
		echo "Use: make deploy PROJECT=<pages-project-name> [BRANCH=main]"; \
		echo "Or set CF_PAGES_PROJECT in your environment."; \
		exit 1; \
	fi
	@echo "Deploying dist/ to Cloudflare Pages project '$(PROJECT)' (branch: $(BRANCH))"
	bun run build
	wrangler pages deploy dist --project-name "$(PROJECT)" --branch "$(BRANCH)"
