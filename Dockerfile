# build
FROM node:dubnium-alpine as webapp

ARG browser_env
ENV browser_env $browser_env

# nginx
RUN apk update && apk add nginx

RUN rm -rf /etc/nginx/conf.d/default.conf
RUN mkdir -p /myeongjae/logs/nginx/
RUN mkdir -p /myeongjae/service/static

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# app
RUN mkdir -p /usr/local/helloworld/

WORKDIR /usr/local/helloworld/

RUN mkdir -p pages public scripts server src templates

COPY pages pages/
COPY public public/
COPY scripts scripts/
COPY server server/
COPY src src/
COPY templates templates/

COPY .babelrc jest.config.js next-env.d.ts next.config.js nodemon.json package-lock.json package.json tsconfig.json tslint.json ./

RUN npm install && npm run build && rm -rf node_modules && npm install --production

ENTRYPOINT [ "sh", "-c", "nohup nginx -g 'daemon off;' & export $(echo $node_env) && npm run start" ]
