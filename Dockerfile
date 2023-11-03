FROM node:20 as packages

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

FROM node:20 as builder

WORKDIR /app

COPY --from=packages /app/node_modules ./node_modules

COPY . .

RUN yarn build

FROM node:20 as runner

WORKDIR /app

ENV NODE_ENV=$NODE_ENV
ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_PORT=$MYSQL_PORT
ENV MYSQL_DB=$MYSQL_DB
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
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