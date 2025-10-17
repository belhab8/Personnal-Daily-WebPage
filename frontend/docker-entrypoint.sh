#!/bin/sh
# Définit le port dynamique si Railway en fournit un
PORT=${PORT:-80}
echo "Starting Nginx on port $PORT"

# Remplace le port dans la config Nginx par celui fourni
sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/conf.d/default.conf

# Lance Nginx en avant-plan
nginx -g "daemon off;"
