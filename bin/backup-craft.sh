#! /bin/bash

# A simple script that uses remote-sync to backup
/home/forge/[[name]].weareferal.com/craft remote-backup/database/create
/home/forge/[[name]].weareferal.com/craft remote-backup/database/prune
/home/forge/[[name]].weareferal.com/craft remote-backup/volume/create
/home/forge/[[name]].weareferal.com/craft remote-backup/volume/prune