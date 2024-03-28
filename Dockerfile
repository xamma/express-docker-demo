FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    nodejs

RUN chown -R nodejs uploads/

USER nodejs

EXPOSE 3000

CMD ["node", "app.js"]