FROM node:8.13.0

EXPOSE 8080

WORKDIR /pah-fm/frontend

COPY package.json package-lock.json ./

RUN npm install \
    && npm cache clean --force

ADD ./ ./

ENTRYPOINT ["npm", "run", "serve"]