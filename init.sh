#!/bin/sh
while true; do
  read -p "Enter a project name: " folder_name

  if [ -d "$folder_name" ]; then
    if [ "$(ls -A $folder_name)" ]; then
      echo "Error: the folder already exists and is not empty."
    else
      break
    fi
  else
    mkdir $folder_name
    break
  fi
done

cd $folder_name
ddev config --project-type=craftcms --docroot=web --create-docroot
ddev composer create -y smonist/craft-vite-starter
make install
make dev