FROM node:18.14.2

EXPOSE 8090

WORKDIR /pah-fm/frontend

COPY package.json yarn.lock ./

RUN yarn install

ADD ./ ./

ENTRYPOINT ["bash", "docker-entrypoint.sh"]
