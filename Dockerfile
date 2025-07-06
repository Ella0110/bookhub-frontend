FROM node:alpine3.18 as build
# Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# 声明两个 build-arg
ARG VITE_API_BASE_URL
ARG VITE_STRIPE_PUB_KEY
# 然后设置成环境变量，Vite build 时就会替换
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_STRIPE_PUB_KEY=${VITE_STRIPE_PUB_KEY}

RUN npm run build
# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]