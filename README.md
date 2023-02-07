<!-- <img alt="craft-vite" src="https://raw.githubusercontent.com/smonist/craft-vite-starter/main/header.png"/> -->
<img alt="craft-vite" src="header.png"/>
<br />
<div align="center">
    <img src="https://badgen.net/packagist/name/smonist/craft-vite-starter" alt="Packagist Package Name" />
    <img src="https://badgen.net/packagist/v/smonist/craft-vite-starter" alt="Packagist Package Version"/>
</a>
</div>
<br />
<div align="center"><strong>Craft CMS 4 infused with Vite, TypeScript and WindiCSS.</strong></div>
<div align="center">Lightning fast development, HMR and a production ready build process 🍃</div>

<br />
<div align="center">
  <sub>Made by</sub><br />
  <sub><a href="https://twitter.com/smonist">Simon Wesp</a></sub><br />
  <sub><a href="https://twitter.com/thomasbendl">Thomas Bendl</a></sub>  
</div>

<br />

## Turbostart 🚀

```sh
source <(curl -s https://raw.githubusercontent.com/smonist/craft-vite-starter/main/init.sh)
```

## Quickstart

1.  ``ddev config --project-type=craftcms --docroot=web --create-docroot``
2.  ``ddev composer create -y smonist/craft-vite-starter``
3.  ``make install``
4.  ``make dev``

## Tech Stack

-   [🔥 **Craft CMS 4**](https://github.com/craftcms/cms)
-   [🚢 **DDEV**](https://github.com/drud/ddev)
-   [📦 **Vite**](https://github.com/vitejs/vite)
-   [🔒 **TypeScript**](https://github.com/microsoft/TypeScript)
-   [💨 **WindiCSS**](https://github.com/windicss/windicss)

## Requirements

-   DDEV
-   Unix-based OS (MacOS, Linux)


### If you are on Windows

Use WSL2 and follow the instructions for Unix-based OS. [DDEV Documentation](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/) is a great starting point.

## Commands
-   ``make install`` - patches the DDEV craft config and installs Craft CMS. Should only be used as a first time setup.
-   ``make dev`` - starts the development server
-   ``make build`` - bundles the assets for production


## Subsequent Use

-   ``ddev yarn`` - for managing frontend packages
-   ``ddev composer`` - for managing backend packages
-   ``ddev craft`` - exposes the [Craft CLI](https://ddev.readthedocs.io/en/latest/users/usage/commands/)




## The team behind the magic ✨ 🪄 🦄

-  https://github.com/smonist
-  https://github.com/thomasbendl


## Credits

This repository is based on the official [Craft CMS 4 starter template](https://github.com/craftcms/craft).  
Thanks to Andrew Welch for the great [craft-vite plugin](https://github.com/nystudio107/craft-vite)!