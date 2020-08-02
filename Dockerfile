# build
FROM node:dubnium-alpine as webapp

ARG browser_env
ENV browser_env $browser_env

# nginx
RUN apk update && apk add nginx &&\
  rm -rf /etc/nginx/conf.d/default.conf &&\
  mkdir -p /myeongjae/logs/nginx/ &&\
  mkdir -p /myeongjae/service/static &&\
  mkdir -p /usr/local/helloworld/ &&\
  cd /usr/local/helloworld/ &&\
  mkdir -p pages public scripts server src templates

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

WORKDIR /usr/local/helloworld/

COPY pages pages/
COPY public public/
COPY scripts scripts/
COPY server server/
COPY src src/
COPY templates templates/

COPY .babelrc jest.config.js next-env.d.ts next.config.js nodemon.json package-lock.json package.json tsconfig.json .eslintrc.js ./

RUN export $(echo $browser_env) > /dev/null && npm install && npm run build && rm -rf node_modules && npm install --production

ENTRYPOINT [ "sh", "-c", "nohup nginx -g 'daemon off;' & export $(echo $node_env) > /dev/null && npm run start" ]
