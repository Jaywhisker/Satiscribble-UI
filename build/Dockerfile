FROM node:latest as build

USER root

RUN apt-get update

WORKDIR /satiscribble-ui

COPY ../package.json ./package.json
COPY ../package-lock.json ./package-lock.json

RUN npm install