FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli@18.2.11
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

FROM nginx:alpine AS production

COPY --from=builder /app/dist/app/browser /usr/share/nginx/html
COPY ./ci/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]