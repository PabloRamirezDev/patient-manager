FROM node:20 as packages

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

FROM node:20 as builder

WORKDIR /app

COPY --from=packages /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG MYSQL_HOST
ARG MYSQL_PORT
ARG MYSQL_USER
ARG MYSQL_DB
ARG MYSQL_PASSWORD

RUN yarn build

FROM node:20 as runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD [ "yarn", "start" ]