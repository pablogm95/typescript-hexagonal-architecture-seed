######################
# BASE CONFIGURATION #
######################
FROM node:20-alpine AS base

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

EXPOSE 8080

COPY package*.json ./

RUN npm install

COPY . /app


#############################
# DEVELOPMENT CONFIGURATION #
#############################
FROM base AS development

ENV NODE_ENV=development


######################
# BUILD CONFIGURATION #
######################
FROM base AS build

RUN npm run compile


############################
# PRODUCTION CONFIGURATION #
############################
FROM node:20-alpine AS production

WORKDIR /app

ENV \
  PATH=/app/node_modules/.bin:$PATH \
  NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

# Copy the source build
COPY --from=build /app/dist /app/dist

USER node
