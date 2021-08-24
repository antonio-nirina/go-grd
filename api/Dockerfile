FROM golang:1.16-alpine
RUN apk add git
WORKDIR /server

COPY go.mod ./
COPY go.sum ./
RUN go mod tidy

COPY . .
RUN ls  -a
RUN go build -o /api

EXPOSE 4000

CMD [ "/api" ]
