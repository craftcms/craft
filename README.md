<br />
<div align="center"><strong>What if tooling was done with 1 command?</strong></div>

<img alt="craft-vite" src="header.png"/>
<div align="center"><strong>Craft CMS 4 infused with Vite, TypeScript and WindiCSS.</strong></div>
<div align="center">Lightning fast development, HMR and a production ready build process.</div>

<br />
<div align="center">
  <sub>Made possible by</sub>
  <sub>
  <a href="https://szenario.design/" target="_blank">
    <img src="szenario.svg" alt="szenario.design logo" /></a>
  </sub><br /><br />
  <sub>The team behind the magic</sub><br />
  <sub><a href="https://twitter.com/smonist">Simon Wesp</a></sub>
  <sub><a href="https://twitter.com/thomasbendl">Thomas Bendl</a></sub>  
</div>

<br />

## Turbostart 🚀

```sh
bash <(curl -s https://raw.githubusercontent.com/smonist/craft-vite-starter/main/init.sh)
```

## Quickstart

1.  `mkdir my-project && cd my-project`
2.  `ddev config --project-type=craftcms --docroot=web --create-docroot`
3.  `ddev composer create -y smonist/craft-vite-starter`
4.  `make install`
5.  `make dev`

## Tech Stack

- [🔥 **Craft CMS 4**](https://github.com/craftcms/cms)
- [🚢 **DDEV**](https://github.com/drud/ddev)
- [📦 **Vite**](https://github.com/vitejs/vite)
- [🔒 **TypeScript**](https://github.com/microsoft/TypeScript)
- [💨 **WindiCSS**](https://github.com/windicss/windicss)

## Requirements

- DDEV
- Unix-based OS (MacOS, Linux)

### If you are on Windows

Use WSL2 and follow the instructions for Unix-based OS. [DDEV Documentation](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/) is a great starting point.

## Commands

- `make install` - patches the DDEV craft config and installs Craft CMS. Should only be used as a first time setup.
- `make dev` - starts the development server
- `make build` - bundles the assets for production

## Subsequent Use

- `ddev yarn` - for managing frontend packages
- `ddev composer` - for managing backend packages
- `ddev craft` - exposes the [Craft CLI](https://ddev.readthedocs.io/en/latest/users/usage/commands/#craft)

### Critical CSS

To use Critical CSS, you need to manually add the pages that should be pre-rendered to the `criticalPages` array in `vite.config.ts`. The pages will be pre-rendered when building and the generated CSS will be inlined in the HTML.


## Credits

This repository is based on the official [Craft CMS 4 starter template](https://github.com/craftcms/craft).  
Thanks to Andrew Welch for the great [craft-vite plugin](https://github.com/nystudio107/craft-vite)!


## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/smonist"><img src="https://avatars.githubusercontent.com/u/7086613?v=4?s=100" width="100px;" alt="Simon Wesp"/><br /><sub><b>Simon Wesp</b></sub></a><br /><a href="https://github.com/szenario-fordesigners/craft-vite-starter/commits?author=smonist" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/thomasbendl"><img src="https://avatars.githubusercontent.com/u/8804216?v=4?s=100" width="100px;" alt="Thomas Bendl"/><br /><sub><b>Thomas Bendl</b></sub></a><br /><a href="https://github.com/szenario-fordesigners/craft-vite-starter/commits?author=thomasbendl" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/estebancastro"><img src="https://avatars.githubusercontent.com/u/2717274?v=4?s=100" width="100px;" alt="Esteban Castro"/><br /><sub><b>Esteban Castro</b></sub></a><br /><a href="https://github.com/szenario-fordesigners/craft-vite-starter/commits?author=estebancastro" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->