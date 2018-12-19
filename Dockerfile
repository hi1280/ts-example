# Build
FROM node:10.14.2-alpine AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build
# Release
FROM node:10.14.2-alpine AS release-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production --silent
COPY --from=build-stage /usr/src/app/dist /usr/src/app/dist
COPY ./src/*.graphql ./dist/
EXPOSE 3000
ENV NODE_ENV production
CMD [ "node", "dist/index.js" ]