FROM golang:1.16-alpine

WORKDIR /server

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./
RUN go build -o /api

EXPOSE 4000

CMD [ "/api" ]
