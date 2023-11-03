FROM node:20 as packages

WORKDIR /app

ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_PORT=$MYSQL_PORT
ENV MYSQL_DB=$MYSQL_DB
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD

COPY package.json .
COPY yarn.lock .

RUN yarn install 

FROM node:20 as build

WORKDIR /app

COPY --from=packages /app/node_modules ./node_modules
COPY --from=packages /app/package.json package.json
COPY --from=packages /app/yarn.lock yarn.lock

COPY . .

RUN yarn build

FROM node:20 as runner

WORKDIR /app

COPY --from=build /app/.next .next
COPY --from=build /app/package.json package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "yarn", "start" ]