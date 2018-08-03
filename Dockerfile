FROM php:7-apache

ADD . /var/www/html

RUN a2enmod rewrite

EXPOSE 80

CMD "apache2-foreground"
