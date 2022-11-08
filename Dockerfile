# /usr/src/nodejs/hello-docker/Dockerfile
FROM node:10.0

# 在容器中创建一个目录
RUN mkdir -p /home/yfQQ/docker

# 定位到容器的工作目录
WORKDIR /home/yfQQ/docker

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
# COPY package.json /home/yfQQ/docker/package.json
# RUN cd /home/yfQQ/docker
# RUN npm i

# 把当前目录下的所有文件拷贝到 Image 的 /usr/src/nodejs/ 目录下
COPY . /home/yfQQ/docker

RUN cd /home/yfQQ/docker/plugin/qrcode/
RUN npm i
RUN npm i sharp --unsafe-perm
WORKDIR /home/yfQQ/docker
EXPOSE 9988 5700 6700
CMD npm run dev
