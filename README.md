About
====

WebWatcher is self hosted HTTP health monitor, web achiever, automated testing framework, that allows in depth analysis between two 
snapshots.

Installation
====

Via docker: 

- Create a `docker-compose.yaml` file with following contents

```
version: '2'
services:
    db:
        image: mysql:5.7.22
        ports:
            - '3303:3306'
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: symfony
            MYSQL_USER: symfony
            MYSQL_PASSWORD: symfony
    php:
        image: ivanstan/webwatcher
        volumes:
            - './:/var/www/symfony:cached'
            - './var/log/symfony:/var/www/symfony/var/logs:cached'
        links:
            - db
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: symfony
            MYSQL_USER: symfony
            MYSQL_PASSWORD: symfony
            PROXY_PORT_RANGE: 9091-9191
    nginx:
        image: ivanstan/webwatcher-nginx
        ports:
            - '8080:80'
        links:
            - php
        volumes_from:
            - php
        volumes:
            - './var/log/nginx/:/var/log/nginx:cached'
    selenium-hub:
        image: 'selenium/hub:3.12.0-boron'
        ports:
            - '4444:4444'
    chrome-node:
        image: 'selenium/node-chrome:3.12.0-boron'
        volumes:
            - '~/webwatcher/selenium:/e2e/uploads'
            - '~/webwatcher/selenium/tmp:/e2e/uploads/tmp'
        ports:
            - 5900
        expose:
            - 80
        links:
            - 'selenium-hub'
        depends_on:
            - selenium-hub
        environment:
            - HUB_HOST=selenium-hub
            - HUB_PORT=4444
    firefox-node:
        image: 'selenium/node-firefox:3.12.0-boron'
        volumes:
            - '~/webwatcher/selenium:/e2e/uploads'
            - '~/webwatcher/selenium/tmp:/e2e/uploads/tmp'
        ports:
            - '5900'
        expose:
            - '80'
        links:
            - 'selenium-hub'
        depends_on:
            - selenium-hub
        environment:
            - HUB_HOST=selenium-hub
            - HUB_PORT=4444
    browsermob-proxy:
        image: qautomatron/docker-browsermob-proxy
        ports:
            - '9090-9191:9090-9191'
        expose:
            - 9090-9191
        environment:
            - PORT_RANGE=9091-9191
        links:
            - 'selenium-hub'
            - 'firefox-node'
            - 'chrome-node'
```
- Run `docker-compose up`
- Navigate to http://localhost:8080/install to create admin user
