#!/bin/bash

name=${PWD##*/} 
slug="${name//-/_}"

psql -c "create database $slug;"
psql -c "create user $slug with password '$slug';"
psql -c "grant all privileges on database $slug to $slug;"

find . -type f ! -path '*/vendor/*' ! -path '*/bin/composer/*' -print0 | xargs -0 sed -i '' -e "s/\[\[name\]\]/$name/g"
find . -type f ! -path '*/vendor/*' ! -path '*/bin/composer/*' -print0 | xargs -0 sed -i '' -e "s/\[\[slug\]\]/$slug/g"
