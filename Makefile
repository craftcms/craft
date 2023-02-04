.PHONY: build dev up install

build: up
	ddev yarn build
dev: up
	ddev yarn dev
install:
	ddev config --project-type=craftcms
	@echo "applying patches..."
	cp patches/docker-compose.vite.yaml .ddev/docker-compose.vite.yaml
	cp patches/config.m1.yaml .ddev/config.m1.yaml
	cat patches/config.yaml >> .ddev/config.yaml
	ddev start
	ddev composer install
	ddev yarn install
	ddev start
	ddev craft setup/app-id \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev craft setup/security-key \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev craft install \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev craft plugin/install vite
	@echo "ready for takeoff 🎉🎉🎉"
	@echo "type 'make dev' to  run vite development server"
up:
	if [ ! "$$(ddev describe | grep OK)" ]; then \
		ddev start; \
		ddev composer install; \
		ddev yarn install; \
    fi
%:
	@:
# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line