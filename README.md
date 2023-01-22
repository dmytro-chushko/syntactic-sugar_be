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

![image](https://user-images.githubusercontent.com/93491902/213924105-8fea848c-8bf7-4226-a1f4-407c97817483.png)


**Entities**: 

* users:
  * id: varchar, primary key;
  * email: varchar, unique;
  * password: varchar, default - null;
  * role: varchar, default - "GUEST";

* categories:
  * id: varchar, primary key, not null;
  * name: varchar, not null, unique;
  
* chat:
  * id: varchar, primary key, not null;
  * createdAt: datetime, not null, default - current_timetamp;
  * updatedAt: datetime, not null, default - current_timetamp on update current_timetamp;
  * freelancerId: varchar, default - null;

* countries:
  * id: varchar, primary key, not null;
  * name: varchar, not null, unique;
 
* education:
  * id: int, not null, primary key, auto increment;
  * institute: varchar, not null;
  * occupation: varchar, not null;
  * period: varchar, not null;
  * freelancersId: varchar, default - null;


## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

