FROM ubuntu:18.04
ADD . /app
RUN apt-get update --fix-missing

RUN export DEBIAN_FRONTEND=noninteractive && apt-get install -y apache2 php7.1 php-xml libapache2-mod-php curl php-intl git php-curl composer
# Configure Apache
RUN rm -rf /var/www/* \
    && a2enmod rewrite \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf
ADD docker/vhost.conf /etc/apache2/sites-available/000-default.conf
# Install Symfony
RUN mkdir -p /usr/local/bin
RUN curl -LsS https://symfony.com/installer -o /usr/local/bin/symfony
RUN chmod a+x /usr/local/bin/symfony
# Add main start script for when image launches
ADD run.sh /run.sh
RUN chmod 0755 /run.sh
WORKDIR /app
EXPOSE 80
CMD ["docker/run.sh"]
