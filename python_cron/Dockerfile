FROM python:3.12-slim

# Répertoire de travail
WORKDIR /app

# Copie des fichiers
COPY scripts/ ./scripts/
COPY requirements.txt .
RUN pip install -r requirements.txt

# Installe cron et dépendances
RUN apt-get update && apt-get install -y cron && \
    chmod +x /app/scripts/generate_today_json.py

# Ajout du cron job
# "0 4 * * *" = tous les jours à 4h du matin UTC
RUN echo "0 4 * * * python /app/scripts/generate_today_json.py >> /var/log/cron.log 2>&1" > /etc/cron.d/today-cron

# Applique les permissions requises
RUN chmod 0644 /etc/cron.d/today-cron && crontab /etc/cron.d/today-cron

# Commande de démarrage : cron en avant-plan
CMD ["cron", "-f"]
