FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

EXPOSE 8000

WORKDIR /pah-fm/backend

COPY Pipfile Pipfile.lock ./

RUN pip install --upgrade pip         \
   && pip install pipenv==2022.12.19  \
   && pipenv install --system --dev

ADD ./ ./

ENTRYPOINT ["bash", "docker-entrypoint.sh"]
