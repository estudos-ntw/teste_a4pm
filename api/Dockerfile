FROM node:20-bullseye-slim

RUN set -ex; \
    apt-get update -y ; \
    apt-get install -y --no-install-recommends \
    openssl

USER node

WORKDIR /home/node/api



CMD ["tail","-f","/dev/null"]

