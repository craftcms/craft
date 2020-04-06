#! /bin/bash

# Deployment script used by Forge to update the server. This should be copied
# to the "deployment script" section of the relevent Craft site
cd /home/forge/[[name]].weareferal.com
git pull origin develop
./bin/update-craft.sh
echo "" | sudo -S service php7.3-fpm reload
