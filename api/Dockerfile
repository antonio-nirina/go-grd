FROM golang:1.16.2 AS build-env

WORKDIR /server
ADD . /server

RUN go build -o /api cmd/api/main.go

FROM debian:buster

WORKDIR /
COPY --from=build-env /api /

ENTRYPOINT ["/api"]