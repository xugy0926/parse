FROM node:latest

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN npm install -g yarn
RUN yarn

ENV APP_NAME testApp
ENV MOUNT_PATH /parse
ENV DASHBOARD_PATH /dashboard
ENV APP_ID myAppId
ENV JAVASCRIPT_KEY myJavaScriptKey
ENV MASTER_KEY myMasterKey
ENV REST_KEY myRestKey
ENV FILE_KEY optionalFileKey
ENV DATABASE_URI mongodb://192.168.2.200:27017/dev
ENV SERVER_URL http://192.168.2.200:1337/parse
ENV CLOUD /parse/cloud/main.js

EXPOSE 1337
EXPOSE 13371

CMD [ "node", "app.js" ]