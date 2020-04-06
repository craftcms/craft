#!/bin/bash

name=${PWD##*/} 
slug="${name//-/_}"
secret=$(head /dev/urandom | LC_ALL=C tr -dc A-Za-z0-9 | head -c 30 ; echo '')

if [ "$( psql -tAc "SELECT 1 FROM pg_database WHERE datname='$slug'" )" != '1' ]
then
    psql -c "create database $slug;"
    psql -c "create user $slug with password '$slug';"
    psql -c "grant all privileges on database $slug to $slug;"
fi

# Replace all instances of [[name]], [[slug]] and [[secret]] in the project
find . -type f ! -path '*/vendor/*' ! -path '*/bin/composer/*' -print0 | xargs -0 sed -i '' -e "s/\[\[name\]\]/$name/g"
find . -type f ! -path '*/vendor/*' ! -path '*/bin/composer/*' -print0 | xargs -0 sed -i '' -e "s/\[\[slug\]\]/$slug/g"
find . -type f ! -path '*/vendor/*' ! -path '*/bin/composer/*' -print0 | xargs -0 sed -i '' -e "s/\[\[secret\]\]/$secret/g"
