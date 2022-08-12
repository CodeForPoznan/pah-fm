FROM node:8.12.0

EXPOSE 8080

WORKDIR /pah-fm/frontend

COPY package.json package-lock.json ./

RUN npm install

ADD ./ ./

ENTRYPOINT ["bash", "docker-entrypoint.sh"]