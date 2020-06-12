# Docker Compose

可以使用Docker Compose管理、连接多个容器，只需要增加一个`docker-compose.yml`的配置文件。例如一个Node应用容器搭配一个数据库容器开发时，如果使用命令行通过Network通信比较繁琐（下面的部分展示了），而使用Docker Compose就能够方便地管理多个容器，还能够配置它们之间的关联关系，一切只需要在配置文件中配置完成后执行：

```bash
$ docker-compose up
```

-----

# 不使用Docker Compose

## 启动mongo镜像，作为数据库端

```bash
$ docker run -d --rm --name db --network my-app-net -p 27017:27017 mongo:3
```

> 指定容器名称为 db，映射的端口为27017，其他容器连接的url为`mongodb://db:27017`

### 启动mongo镜像作为客户端连接上述数据库端（测试）

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
