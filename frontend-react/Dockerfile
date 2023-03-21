FROM node:16.19

EXPOSE 8090

WORKDIR /pah-fm/frontend-react

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 999999 \
    && yarn install

ADD ./ ./

ENTRYPOINT ["yarn", "run", "start"]