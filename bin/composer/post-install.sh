#!/bin/bash

name=${PWD##*/} 
slug="${name//-/_}"

find . -type f ! -path '*/vendor/*' ! -path '*/bin/composer/*' -print0 | xargs -0 sed -i '' -e "s/\[\[name\]\]/$name/g"
find . -type f ! -path '*/vendor/*' ! -path '*/bin/composer/*' -print0 | xargs -0 sed -i '' -e "s/\[\[slug\]\]/$slug/g"
