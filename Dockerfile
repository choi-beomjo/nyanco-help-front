# 1단계: Vue 앱 빌드
FROM node:18 AS build-stage
WORKDIR /app
COPY config/package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: Nginx로 Vue 앱 제공
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
