FROM composer as vendor
COPY modules modules
COPY composer.json composer.json
COPY composer.lock composer.lock
RUN composer install --ignore-platform-reqs --no-interaction --prefer-dist

FROM php:7.3-apache-stretch
ENV PHP_OPCACHE_ENABLE="1" \
    PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
    PHP_OPCACHE_MAX_ACCELERATED_FILES="10000" \
    PHP_OPCACHE_MEMORY_CONSUMPTION="192" \
    PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10"
COPY .docker/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
RUN apt-get update && apt-get install -y --no-install-recommends lsb-release zlib1g-dev libpng-dev libjpeg-dev libpq-dev libzip-dev libicu-dev libmagickwand-dev mysql-client && pecl install imagick
RUN docker-php-source extract && docker-php-ext-install pdo pdo_mysql intl zip bcmath gd opcache && docker-php-ext-enable imagick && docker-php-source delete
RUN sed -ri -e 's!/var/www/!/var/www/html/web!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf && \
    sed -ri -e 's!/var/www/html!/var/www/html/web!g' /etc/apache2/sites-available/*.conf && a2enmod rewrite
RUN if [ "$APP_ENV" == "production" ]; then mv $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/php.ini; else mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini; fi
RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 10M/g' $PHP_INI_DIR/php.ini
RUN sed -i 's/memory_limit = 128M/memory_limit = 256M/g' $PHP_INI_DIR/php.ini
RUN sed -i 's/max_execution_time = 30/max_execution_time = 120/g' $PHP_INI_DIR/php.ini
COPY .docker/000-default.conf /etc/apache2/sites-enabled
COPY --chown=www-data:www-data . /var/www/html
COPY --chown=www-data:www-data --from=vendor /app/vendor/ /var/www/html/vendor/
RUN chmod -R 777 /var/www/html/storage
RUN chmod -R 777 /var/www/html/web/cpresources
RUN chmod -R 777 /var/www/html/vendor
