# Build stage

FROM node:lts-bookworm-slim AS build

WORKDIR /app

COPY package-lock.json package.json ./

RUN apt-get update -y && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

RUN npm ci && npm cache clean --force


COPY . .

RUN npx prisma generate

RUN npm install -g typescript

RUN npm run build

# Start stage

FROM node:lts-bookworm-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package-lock.json package.json ./

RUN npm ci -omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

# USER node

EXPOSE 8080

CMD [ "npm","run","start" ]

