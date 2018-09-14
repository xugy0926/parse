Example project using the parse-server module on Express.

## run

```
$ npm start
```

## docker deploy

#### build image
 
```
$ docker build -t parse .
```

#### default env

you can modify `Dockerfile`.

```
ENV APP_NAME testApp
ENV MOUNT_PATH /parse
ENV DASHBOARD_PATH /dashboard
ENV APP_ID myAppId
ENV MASTER_KEY myMasterKey
ENV DATABASE_URI mongodb://mongodb_ip:27017/dev
ENV REST_KEY myRestKey
ENV FILE_KEY optionalFileKey
ENV SERVER_URL http://host_ip:1337/parse
```

#### run container

when you run the container, you can customize the env parameters.

```
$ docker run --name testapp -p 1337:1337 -e APP_NAME=TEST_APP parse
```

and, you can customize the cloud/main.js.

```
$ docker run --name testapp -p 1337:1337 -e APP_NAME=TEST_APP -v "$(pwd)"/cloud:/parse/cloud:ro  parse
```

#### visit

###### dashborad
http://host_ip:1337/dashborad

###### api

http://host_ip:1337/parse


