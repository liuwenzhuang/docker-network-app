# Docker network

`network`是一个比较艰深的概念，能做到事情也有很多，这里我们利用它来实现容器之间的通信，首先看下`network`的基本操作：

```bash
# 查看有哪些网络
$ docker network ls

# 创建的桥接网络，能够使容器之间可以通信
$ docker network create --driver=bridge my-app-net
```

> 一般来说不要使用docker预支的桥接网络，自己创建一个。

## 启动mongo镜像，作为数据库端

```bash
$ docker run -d --rm --name db --network my-app-net -p 27017:27017 mongo:3
```

> 指定容器名称为 db，映射的端口为27017，其他容器连接的url为`mongodb://db:27017`

### 启动mongo镜像作为客户端连接上述数据库端

```bash
$ docker run -it --rm --network my-app-net mongo:3 mongo --host db
```

## build、run Node服务

此Node服务，会启动express服务，连接上述数据库处理数据：

```bash
$ docker build -t docker-network-app .
$ docker run --init --rm --network my-app-net -p 8085:8085 --env MONGO_DB_URL=mongodb://db:27017 docker-network-app
```

## 浏览器访问

- http://localhost:8085/add 插入数据
- http://localhost:8085 查询数据
