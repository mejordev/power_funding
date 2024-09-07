FROM rust:latest as builder
WORKDIR /app

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

COPY . .

RUN cargo build --release

#Preduction stage
FROM ubuntu:22.04

WORKDIR /user/local/bin

COPY --from=builder /app/target/release/indexer .

CMD [ "./indexer" ]