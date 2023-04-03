问题：nginx将请求反向代理至其他容器内的server，该如何配置。

## 启用服务a容器，监听3002端口

## 启用nginx容器，监听80端口
将80端口的请求反向代理到容器a的3002端口，则需要配置一下nginx.conf中的upstream，以及让容器a和容器b处于同一个docker network下。

核心就是，在容器b中，可以识别到{服务b的容器名:3002}。

```nginx.conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on; // Uncomment if you want to disable TCP push
    keepalive_timeout  65;

    #gzip  on; // Uncomment if you want to enable gzip compression

    upstream myapp {
        server chatgpt-web:3002;
    }
    server {
        listen       80;
        server_name  localhost;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }

    server {
        listen       80;
        server_name  chat1.oldwinter.top 35.77.211.36;

        location / {
            proxy_pass http://myapp;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

## 通过docker-compose统一启动

```yaml
version: '3'

services:
  nginx:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - /home/ubuntu/nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - chatgpt-web

  chatgpt-web:
    image: chenzhaoyu94/chatgpt-web # 总是使用 latest ,更新时重新 pull 该 tag 镜像即可
    container_name: chatgpt-web
    ports:
      - 0.0.0.0:3002:3002
```