#! /bin/bash

# A simple script used to update a Craft site during deployment
composer install --ignore-platform-reqs --no-interaction --optimize-autoloader
./craft migrate/all
./craft project-config/sync
./craft clear-caches/all
./craft asset-versioner/scan

