.PHONY: build dev up install

build:
	ddev yarn build
	ddev launch
dev:
	ddev launch
	ddev yarn dev
install:
	@echo "applying patches..."
	cp patches/docker-compose.vite.yaml .ddev/docker-compose.vite.yaml
	cp patches/config.criticalcss.yaml .ddev/config.criticalcss.yaml
	ddev restart
	ddev yarn install
	ddev craft setup/app-id \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev craft setup/security-key \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev craft install \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev craft plugin/install vite
	@echo "ready for takeoff 🎉🎉🎉"
	@echo "type 'make dev' to  run vite development server"
%:
	@:
# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line