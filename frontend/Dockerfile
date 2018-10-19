FROM node:8.12.0 as node

# Expose network ports
EXPOSE 4200

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . /frontend