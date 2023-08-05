.PHONY: build dev up install

build:
	ddev yarn build
dev: up
	ddev yarn dev
install:
	@echo "applying patches..."
	cp patches/docker-compose.vite.yaml .ddev/docker-compose.vite.yaml
	cp patches/config.criticalcss.yaml .ddev/config.criticalcss.yaml
	cp patches/config.node.yaml .ddev/config.node.yaml

# remove default .gitignore entries from ddev. we want our ptaches to be tracked by git
	sed -i '/config.*.y*ml/d' .ddev/.gitignore
	
	@echo "cleaning project..."
	rm -rf patches .all-contributorsrc header.png szenario-logo.svg Makefile renovate.json
	mv Makefile.default Makefile
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
up:
	if [ ! "$$(ddev describe | grep OK)" ]; then \
		ddev start; \
    fi
%:
	@:
# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line
