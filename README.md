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

## Database 

[db_schema.pdf](https://github.com/ZenBit-Tech/syntactic-sugar_be/files/10474547/db_schema.pdf)

Entities: 

* users:
  * id: varchar, primary key;
  * email: varchar, unique;
  * password: varchar, default - null;
  * role: varchar, default - "GUEST";

* 
## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

