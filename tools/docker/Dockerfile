FROM node:12-alpine as builder

WORKDIR /opt/app
COPY package.json package-lock.json .npmrc /opt/app/

ARG GITHUB_TOKEN=<not-set>
# work around bender bug
ENV CI=true
RUN npm ci && rm -rf .npmrc

FROM node:12-alpine

WORKDIR /opt/app
COPY --from=builder /opt/app/  /opt/app/
COPY . /opt/app/
RUN rm -rf .npmrc
VOLUME [ "/opt/app/guidelines" ]

ENTRYPOINT ["/opt/app/tools/docker/my_entrypoint.sh"]
