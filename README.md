<a href="https://weareferal.com" rel="noopener" target="_blank"><img width="247" src="https://weareferal.com/assets/images/feral_logo_master.png" alt="Feral"></a>

<br>

A custom composer starter project based on the original Craft `craft` repo:

* https://github.com/craftcms/craft

## Gettings Started

Create your new project:

```sh
composer create-project weareferal/craft new-site
```

Create your DB:

```sh
psql
> create database newsite;
> create user newsite with password 'newsite';
> grant all privileges on database newsite to newsite;
```

Then run the setup script:

```sh
./craft setup
```

And update

```sh
composer update
```