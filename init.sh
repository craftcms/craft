ddev config --project-type=craftcms --docroot=web --create-docroot
ddev composer create -y -s dev smonist/craft-vite-starter
make install
make dev