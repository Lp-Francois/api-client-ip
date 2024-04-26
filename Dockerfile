
FROM node:21-alpine3.18

RUN apk add --no-cache openssl dumb-init

RUN mkdir /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --chown=node:node package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --chown=node:node . .

USER node
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "idex.js"]
