FROM node:22-alpine AS builder

WORKDIR /api

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /api

COPY --from=builder /api/node_modules ./node_modules
COPY --from=builder /api/dist ./dist
COPY --from=builder /api/package*.json ./


EXPOSE 3000

CMD ["sh", "-c", "cd dist/ && node main"]