FROM node:8.12.0
# Expose network ports
EXPOSE 4200

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . /frontend
