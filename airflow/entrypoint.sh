#!/usr/bin/env bash
set -e

# Init DB if missing
if [ ! -f "/opt/airflow/airflow.db" ]; then
    echo "Initializing Airflow DB..."
    airflow db init
    airflow users create \
        --username "${AIRFLOW_USER}" \
        --firstname Air \
        --lastname Flow \
        --role Admin \
        --email "${AIRFLOW_EMAIL:-admin@example.com}" \
        --password "${AIRFLOW_PASSWORD}"
else
    echo "Airflow DB already exists, skipping init."
fi

echo "Starting Airflow scheduler and webserver..."
airflow scheduler & airflow webserver --workers 1
