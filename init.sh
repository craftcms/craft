#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <folder_name>"
  exit 1
fi

folder_name="$1"

if [ -d "$folder_name" ]; then
  if [ "$(ls -A $folder_name)" ]; then
    echo "Error: the folder already exists and is not empty."
    exit 1
  fi
else
  mkdir "$folder_name"
fi

cd $folder_name
ddev config --project-type=craftcms --docroot=web --create-docroot
ddev composer create -y smonist/craft-vite-starter
make install
make dev