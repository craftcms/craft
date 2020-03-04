#! /bin/bash

# A simple script that uses env-sync to backup
/home/forge/{{ domain }}/craft env-sync/database/prune
/home/forge/{{ domain }}/craft env-sync/database/create
/home/forge/{{ domain }}/craft env-sync/database/push
/home/forge/{{ domain }}/craft env-sync/volume/prune
/home/forge/{{ domain }}/craft env-sync/volume/create
/home/forge/{{ domain }}/craft env-sync/volume/push