FROM php:7.2-apache

RUN docker-php-ext-install pdo_mysql

ADD bin /var/www/symfony/bin
ADD config /var/www/symfony/config
ADD public/assets /var/www/symfony/public/assets
ADD public/build /var/www/symfony/public/build
ADD public/.htaccess /var/www/symfony/public/.htaccess
ADD public/index.php /var/www/symfony/public/index.php
ADD src /var/www/symfony/src
ADD templates /var/www/symfony/templates
ADD translations /var/www/symfony/translations
ADD vendor /var/www/symfony/vendor
ADD .env /var/www/symfony/
ADD composer.json /var/www/symfony/composer.json
ADD composer.lock /var/www/symfony/composer.lock

RUN mkdir /var/www/symfony/var
RUN mkdir /var/www/symfony/var/log
RUN mkdir /var/www/symfony/var/cache
RUN mkdir /var/www/symfony/var/cache/prod
RUN mkdir /var/www/symfony/public/data
RUN chmod 777 /var/www/symfony/var/log
RUN chmod 777 /var/www/symfony/var/cache/prod
RUN chmod 777 /var/www/symfony/public/data

ENV APACHE_DOCUMENT_ROOT /var/www/symfony/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite

EXPOSE 80

CMD "apache2-foreground"
