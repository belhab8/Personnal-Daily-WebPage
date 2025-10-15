FROM apache/airflow:slim-2.10.0

ENV AIRFLOW_HOME=/opt/airflow

USER root
RUN apt-get update -qq && apt-get install vim -qqq
COPY requirements.txt .
USER airflow
RUN pip install --no-cache-dir -r requirements.txt