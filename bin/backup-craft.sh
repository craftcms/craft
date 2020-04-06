#! /bin/bash

# A simple script that uses remote-sync to backup
/home/forge/{{ domain }}/craft remote-backup/database/create
/home/forge/{{ domain }}/craft remote-backup/database/prune
/home/forge/{{ domain }}/craft remote-backup/volume/create
/home/forge/{{ domain }}/craft remote-backup/volume/prune
