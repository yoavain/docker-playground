FROM node:16.14.2-alpine3.15@sha256:da7ef512955c906b6fa84a02295a56d0172b2eb57e09286ec7abc02cfbb4c726
RUN apk add dumb-init

ENV NODE_ENV production

WORKDIR /usr/app
COPY . /usr/app
RUN sed -i 's/localhost/host.docker.internal/g' /usr/app/.npmrc
RUN cat /usr/app/.npmrc
RUN npm ci --only=production
RUN mkdir logs
RUN chmod -R 777 logs

USER node
CMD ["dumb-init", "node", "dist/index.js"]
