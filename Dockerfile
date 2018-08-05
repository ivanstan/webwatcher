FROM php:7.2-apache

RUN docker-php-ext-install pdo_mysql

ADD . /var/www/html

RUN a2enmod rewrite

EXPOSE 80

CMD "apache2-foreground"
