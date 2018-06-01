#!/bin/bash
mkdir -p app/cache my_project/app/logs
touch app/logs/prod.log
touch app/logs/dev.log
chgrp -R www-data .
chmod -R g+w app/cache my_project/app/logs
source /etc/apache2/envvars
tail -F /var/log/apache2/* app/logs/prod.log app/logs/dev.log &
exec apache2 -D FOREGROUND
