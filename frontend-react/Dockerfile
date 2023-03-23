FROM node:16.19

EXPOSE 8090

WORKDIR /pah-fm/frontend-react

COPY package.json yarn.lock ./

RUN yarn install \
    && yarn cache clean

ADD ./ ./

ENTRYPOINT ["yarn", "run", "start"]