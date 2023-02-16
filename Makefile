.PHONY: build dev up install

build:
	ddev yarn build
	ddev launch
dev: up
	ddev yarn dev
install:
	@echo "applying patches..."
	cp patches/docker-compose.vite.yaml .ddev/docker-compose.vite.yaml
	cp patches/config.criticalcss.yaml .ddev/config.criticalcss.yaml
	ddev restart
	ddev composer install
	ddev yarn install
	ddev craft setup/app-id
	ddev craft setup/security-key
	ddev craft install
	ddev craft plugin/install vite
	@echo "ready for takeoff 🎉🎉🎉"
	@echo "type 'make dev' to  run vite development server"
up:
	if [ ! "$$(ddev describe | grep OK)" ]; then \
		ddev start; \
    fi
%:
	@:
# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line