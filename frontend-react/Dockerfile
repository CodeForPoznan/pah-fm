FROM node:16.19

EXPOSE 8090

WORKDIR /pah-fm/frontend

ENV PATH /pah-fm/frontend/node_modules/.bin:$PATH

COPY package.json yarn.lock ./

RUN yarn install

ADD ./ ./

ENTRYPOINT ["bash", "docker-entrypoint.sh"]