FROM python:3.9-slim

EXPOSE 8000

WORKDIR /pah-fm/backend

COPY Pipfile Pipfile.lock ./

RUN pip install --upgrade pip        \
    && pip install pipenv==2022.1.8  \
    && pipenv install --system --dev

ADD ./ ./

ENTRYPOINT ["bash", "docker-entrypoint.sh"]