# ODC Craft Starter

This is a starter project for Craft 3 projects at [One Design Company](https://onedesigncompany.com).

## Requirements
- Composer
- Node / NPM

## Getting Started
Before getting too far you should set up your database and virtual host so you have all the info you need to connect to things later.

To create a project using this repo as a base, open up your favorite terminal and run:
```
composer create-project onedesign/craft \
  --repository "{ \"type\": \"vcs\", \"url\": \"https://github.com/onedesign/craft.git\" }" \
  --remove-vcs \
  ./project-name \
  dev-master && \
  cd project-name
```

That will take a little bit, and output a bunch of junk to your console. When it's complete run:
```
$ ./craft setup
```
**NOTE**
If you're using MAMP as your local server of choice, the above command won't work. You have two options. First, you can copy the `.env.example` file in the repo and edit values on your own (be sure to generate a security key) OR you can point the command at your active version of PHP and run it that way. On macOS that looks something like
```
$ /Applications/MAMP/bin/php/{ACTIVE_PHP_VERSION}/bin/php ./craft setup
```
Be sure to replace `ACTIVE_PHP_VERSION` in the above with the version MAMP is currently using. At the time of writing it's probably either `php7.1.12` or `php7.2.1`

To configure your craft instance. The CLI will ask you a few questions and then will ask if you'd like to install Craft now or later, feel free to choose whichever option you'd like.

### Generating a Security Key
TODO

## Front End
On the front end of things we're currently opting for [Blendid](https://github.com/vigetlabs/blendid) primarily in order to get a userful starter project up as fast as possible. If you're not familiar with Blendid you'll want to [read their wiki](https://github.com/vigetlabs/blendid/wiki) to get a better understanding of how it's put together and what you can do to customize it.

We've made a few customizations to it off the bat:
- Add [normalize.css](https://necolas.github.io/normalize.css/) to the main CSS file
- Add [sass-mq](https://github.com/sass-mq/sass-mq) for easier media queryin'
- Set our autoprefixer browsers
- Provide jQuery to all modules

## Included Plugins:
- [Craft 3 Asset Rev](https://github.com/clubstudioltd/craft3-asset-rev)
- [AWS S3 Asset Source](https://github.com/craftcms/aws-s3)
- [Typogrify](https://github.com/nystudio107/craft-typogrify)
- [Environment Label](https://github.com/TopShelfCraft/Environment-Label)

**NOTE**
Plugins are not installed or activated through this process. You'll have to go into the admin and install them after creating a project

## Resources

#### Official Resources
- [Craft 3 Documentation](https://docs.craftcms.com/v3/)
- [Craft 3 Class Reference](https://docs.craftcms.com/api/v3/)
- [Craft 3 Plugins](https://plugins.craftcms.com)
- [Demo site](https://demo.craftcms.com/)
- [Craft Slack](https://craftcms.com/community#slack)
- [Craft CMS Stack Exchange](http://craftcms.stackexchange.com/)

#### Community Resources
- [Mijingo](https://mijingo.com/craft) – Video courses and other learning resources
- [Envato Tuts+](https://webdesign.tutsplus.com/categories/craft-cms/courses) – Video courses
- [Straight Up Craft](http://straightupcraft.com/) – Articles, tutorials, and more
- [pluginfactory.io](https://pluginfactory.io/) – Craft plugin scaffold generator
