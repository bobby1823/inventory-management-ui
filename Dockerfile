### STAGE 1: Build ###
FROM node:10.20.1-alpine3.10 AS build
WORKDIR /app/
#WORKDIR /
COPY . /app/
RUN npm install
RUN npm run build
#CMD  ["ls"]


### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/ims /usr/share/nginx/html
