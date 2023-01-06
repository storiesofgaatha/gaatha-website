FROM node:18-buster-slim

MAINTAINER togglecorp dev@togglecorp.com

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends \
        git bash g++ make

WORKDIR /code
