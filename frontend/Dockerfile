FROM nginx:alpine
COPY . /usr/share/nginx/html

# Définit le port d'écoute automatiquement pour déploiement Railway
RUN sed -i "s/listen 80;/listen ${PORT:-80};/" /etc/nginx/conf.d/default.conf

EXPOSE ${PORT:-80}

CMD ["nginx", "-g", "daemon off;"]