#! /bin/bash

# A script to be used by Forge to delete old backups. This should be called 
# via a scheduled task on the relevent Forge server
cd /home/forge/{{ domain }}
find ./storage/backups -mtime +7 -type f -delete
