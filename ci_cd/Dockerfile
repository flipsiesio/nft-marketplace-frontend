FROM node:16.13.0-alpine as builder
WORKDIR /build
COPY package.json yarn.lock ./

COPY . .

RUN npm install sass
RUN yarn 
RUN yarn build

FROM nginx:alpine
COPY --from=0 /build/packages/client/build/ /var/www/html/
CMD ["nginx","-g","daemon off;"]