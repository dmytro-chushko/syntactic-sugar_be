## Description

[Nest](https://github.com/nestjs/nest) template for the project

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

## Config for .env file:

* **Port**: 
  * PORT = application port which it will listen
  
* **Host**: 
  * HOST = application ip or host name

* **Database**:

  * MYSQL_HOST = database host
  * MYSQL_USER = database user
  * MYSQL_DB = database name
  * MYSQL_PASSWORD = database password
  * MYSQL_PORT = database port
  * MYSQL_ROOT_PASSWORD = database user password
  * CLIENT_HOST = client host

* **GOOGLE OAUTH 2.0**:

  * GOOGLE_CLIENT_ID = id from OAUTH 2.0 for a project
  * GOOGLE_SECRET = client OAUTH 2.0 secret key for project

* **EMAIL**:

  * EMAIL_HOST = email smtp server
  * EMAIL_PORT =email port
  * EMAIL_USER = email from which email should send
  * EMAIL_PASS = email password
  * EMAIL_SENDER = email from which email should send
  * EMAIL_SUBJECT = Text of email subject title

* **CONFIRM_PATH** = path for confirm email

* **JWT**:

  * PRIVATE_KEY = some word to secure the jwt token
  * EXPIRES_IN = time for what jwt token will be valid: milliseconds, msecs, ms, seconds, s, minutes, mins, m, hours, hrs, h, days, d, weeks, w, years, yrs, y
  * SECRET_JWT = some word to secure the jwt token
  * EXPIRES_JWT = time for what jwt token will be valid

## Deploy and update instruction:

Connect to server:

1. Open an SSH client.
2. Locate your private key file. The key used to launch this instance is key.pem
3. Run this command, if necessary, to ensure your key is not publicly viewable
```bash
$ chmod 400 key.pem
```
5. Connect to your instance using its Public IP: Example:
```bash
$ ssh -i "key.pem" ubuntu@ec2-54-84-215-172.compute-1.amazonaws.com
```

Update:
```bash
$ git pull
$ npm i
$ npm run build
$ pm2 restart nestjs
```

## API
You can open Swagger documentation on http://localhost:8000/api

## Test
```bash
$ npm run test
```
