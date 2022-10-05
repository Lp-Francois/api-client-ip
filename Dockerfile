FROM node:16.17.1-slim as base

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
ENTRYPOINT ["dumb-init", "--"]

RUN mkdir /usr/app && chown -R node:node /usr/app
WORKDIR /usr/app

USER node 

ENV NODE_ENV=production

COPY --chown=node:node package*.json ./

RUN npm ci --only=production

COPY --chown=node:node . .

EXPOSE 3000

CMD ["node", "index.js"]
