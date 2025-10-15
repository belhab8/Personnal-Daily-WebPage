FROM apache/airflow:slim-2.10.0

USER root

ENV AIRFLOW_HOME=/opt/airflow
ENV AIRFLOW__CORE__LOAD_EXAMPLES=False

ARG AVIATIONSTACK_API_KEY
ENV AVIATIONSTACK_API_KEY ${AVIATIONSTACK_API_KEY}

RUN apt-get update -qq && apt-get install vim -qqq
COPY requirements.txt .
USER airflow
RUN pip install --no-cache-dir -r requirements.txt

USER root
COPY entrypoint.sh /opt/airflow/entrypoint.sh
RUN chmod +x /opt/airflow/entrypoint.sh

USER airflow