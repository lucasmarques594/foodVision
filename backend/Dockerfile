FROM oven/bun:1.0

WORKDIR /usr/src/app

COPY package.json ./

RUN bun install

COPY . .

EXPOSE 8080

CMD ["bun", "run", "start"]