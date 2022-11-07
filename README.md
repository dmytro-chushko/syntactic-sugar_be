## Description

Nest template for the project

All development must be done from branch - develop

## Installation

```bash
$ npm install
```

## Configuration

In this project there are two ways to connect to MySQL database:

1. From your local machine - just using config in .env files
2. From Docker MySQL image - using docker-compose.yml file (config environment in it)

```bash
# connection with docker
$ docker compose up
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

