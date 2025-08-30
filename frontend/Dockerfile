FROM oven/bun:1.0 AS deps
WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install

FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

RUN npm install --production

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]