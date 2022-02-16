FROM node:12.16.3-alpine3.9

RUN mkdir -p /var/www/dockerize-nuxt/nuxt-app
WORKDIR /var/www/dockerize-nuxt/nuxt-app

COPY . .

EXPOSE ${CLIENT_PORT}

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=${CLIENT_PORT}
VOLUME ./:/var/www/dockerize-nuxt/nuxt-app
CMD [ "npm", "run" , "dev" ]