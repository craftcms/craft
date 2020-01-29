#!/bin/bash

# Craft CMS Server Setup 
#
# Forge Bash Script Recipe for CraftCMS websites on Digital Ocean
#
# @author    webrgp
# @link      https://github.com/webrgp
# @package   craft-do-forge-recipe
# @since     1.0.0
# @license   MIT

# Exit immediately if a simple command exits with a non-zero status (https://ss64.com/bash/set.html) 
set -e

# Helper functions
error_msg () { echo -e "\e[1;31m*** Error:\e[0m $1"; }
success_msg () { echo -e "\e[32m*** $1\e[0m"; }
info_msg () { echo -e "\e[34m*** $1\e[0m"; }
print_msg () { echo -e ">> $1"; }


# Install Digital Ocean Monitoring tools
# https://www.digitalocean.com/docs/monitoring/how-to/upgrade-legacy-agent/
install_do_monitoring_tools () {
  curl -sSL https://repos.insights.digitalocean.com/install.sh | sh
}

# Install jpegoptim & optipng ( https://nystudio107.com/blog/creating-optimized-images-in-craft-cms )
install_imager_req () {
  type jpegoptim >/dev/null 2>&1 || { print_msg "Installing jpegoptim"; apt-get -y install jpegoptim; }
  type optipng >/dev/null 2>&1 || { print_msg "Installing optipng"; apt-get -y install optipng; }
  success_msg "jpegoptim & optipng installed!"
}

install_nginx_extras () {
  type optipng >/dev/null 2>&1 || { print_msg "Installing nginx extras"; apt-get -y install nginx-extras; }
  success_msg "nginx extras installed!"
}

perform_craftcms_server_setup () {
  # Check if the user is root
  user="$(id -un 2>/dev/null || true)"
  if [ "$user" != 'root' ]; then

    error_msg 'this installer needs the ability to run commands as root.
We are unable to find either "sudo" or "su" available to make this happen.'
    exit 1
  fi

  success_msg "Woot! User is root :-)"

  # Install Steps
  install_imager_req
  install_nginx_extras
  install_do_monitoring_tools

  success_msg "CraftCMS setup on Forge completed!"
}

info_msg "Start CraftCMS setup on Forge"

perform_craftcms_server_setup