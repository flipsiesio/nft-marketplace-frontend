FROM node:14-alpine3.15 as builder
WORKDIR /build
COPY package.json yarn.lock ./

COPY . .

RUN yarn 
RUN yarn build

FROM nginx:alpine
COPY --from=0 /build/packages/client/build/ /var/www/html/
CMD ["nginx","-g","daemon off;"]