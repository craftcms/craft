# composer
FROM composer as vendor
COPY composer.json composer.json
COPY composer.lock composer.lock
RUN composer install --ignore-platform-reqs --no-interaction --no-plugins --no-scripts --prefer-dist

# node
# FROM node:10-alpine as frontend
# RUN mkdir -p /app/web
# COPY package.json package-lock.json tailwind-config.js /app/
# COPY resources /app/resources
# WORKDIR /app
# RUN npm install && npm production

# apache
FROM php:7.3-apache-stretch
RUN apt-get update && apt-get install -y zlib1g-dev libpng-dev libpq-dev libzip-dev libicu-dev
RUN docker-php-source extract && docker-php-ext-install pdo pdo_mysql pdo_pgsql intl zip bcmath gd && docker-php-source delete
RUN sed -ri -e 's!/var/www/!/var/www/html/web!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf && \
    sed -ri -e 's!/var/www/html!/var/www/html/web!g' /etc/apache2/sites-available/*.conf && a2enmod rewrite
RUN if [ "$ENV" == "production" ]; then mv $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/php.ini; else mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini; fi
RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 10M/g' $PHP_INI_DIR/php.ini
RUN sed -i 's/memory_limit = 128M/memory_limit = 256M/g' $PHP_INI_DIR/php.ini
RUN sed -i 's/max_execution_time = 30/max_execution_time = 120/g' $PHP_INI_DIR/php.ini
COPY .docker/000-default.conf /etc/apache2/sites-enabled
COPY --chown=www-data:www-data . /var/www/html
COPY --chown=www-data:www-data --from=vendor /app/vendor/ /var/www/html/vendor/
# COPY --from=frontend /app/web/js/ /var/www/html/web/js/
# COPY --from=frontend /app/web/css/ /var/www/html/web/css/
# COPY --from=frontend /app/mix-manifest.json /var/www/html/mix-manifest.json
RUN chmod -R 777 /var/www/html/storage /var/www/html/web/cpresources /var/www/html/vendor
