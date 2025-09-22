FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:docker

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    add_header Access-Control-Allow-Origin "*" always; \
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always; \
    add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization" always; \
    add_header Access-Control-Expose-Headers "Content-Length,Content-Range" always; \
    \
    location / { \
    try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
    expires 1y; \
    add_header Cache-Control "public, immutable"; \
    } \
    \
    location ~ ^/api { \
    if ($request_method = "OPTIONS") { \
    add_header Access-Control-Allow-Origin "*"; \
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"; \
    add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization"; \
    add_header Access-Control-Max-Age 1728000; \
    add_header Content-Type "text/plain; charset=utf-8"; \
    add_header Content-Length 0; \
    return 204; \
    } \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
