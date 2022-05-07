FROM golang:1.14-alpine
RUN apk add git
WORKDIR /usr/server

COPY go.mod ./
COPY go.sum ./
RUN go mod tidy

COPY . .
RUN ls  -a
RUN go build -o /api

EXPOSE 9090

CMD [ "/api" ]