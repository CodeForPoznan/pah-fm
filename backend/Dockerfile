FROM python:3.8-slim

RUN set -ex \
    && apt-get update \
    && apt-get install -y \
        wait-for-it \
        libpq-dev

WORKDIR /pah-fm/backend
ADD   . /pah-fm/backend

RUN pip3 install -r requirements/dev.txt

CMD ["bash", "docker-entrypoint.sh"]
