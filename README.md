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
            MYSQL_ROOT_PASSWORD: symfony
            MYSQL_DATABASE: symfony
            MYSQL_USER: symfony
            MYSQL_PASSWORD: symfony
    webwatcher:
        image: ivanstan/webwatcher
        ports:
            - '8080:80'
        volumes:
            - './var/log/apache/:/var/log/apache:cached'
        environment:
            MYSQL_ROOT_PASSWORD: symfony
            MYSQL_DATABASE: symfony
            MYSQL_USER: symfony
            MYSQL_PASSWORD: symfony
            DATABASE_URL: mysql://symfony:symfony@db:3306/symfony
            PROXY_PORT_RANGE: 9091-9191
            BROWSERMOB_PROXY: http://browsermob-proxy:9090
            SELENIUM_HUB: http://selenium-hub:4444/wd/hub
            PROXY_PORT_RANGE: 9091-9191
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
