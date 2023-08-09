# 使用一个适当的基础镜像（这里使用 Python 3.8）
FROM python:3.8

# 设置工作目录
WORKDIR /app

# 将项目文件添加到容器中的工作目录
COPY . /app

# 安装依赖
RUN pip install -r requirements.txt

# 运行应用
CMD [ "python", "app.py" ]
