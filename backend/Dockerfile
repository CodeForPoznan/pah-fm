FROM python:3.8-slim

EXPOSE 8000

RUN apt-get update -y \
    && apt-get install -y \
        libpq-dev \
        wait-for-it \
        iproute2 \
    && apt-get autoremove

WORKDIR /pah-fm/backend

COPY Pipfile Pipfile.lock ./

RUN pip install --upgrade pip \
    && pip install pipenv==2022.1.8 \
    && pipenv sync --system --dev

ADD . /pah-fm/backend

ENTRYPOINT ["bash", "docker-entrypoint.sh"]