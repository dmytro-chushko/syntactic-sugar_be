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

* employers: 
  * id: varchar, primary key, not null;
  * fullName: varchar, default - null;
  * companyName: varchar, default - null;
  * position: varchar, default - null;
  * phone: varchar, default - null;
  * linkedIn: varchar, default - null;
  * website: varchar, default - null;
  * aboutUs: varchar, default - null;
  * image: varchar, default - null;
  * userId: varchar, default - null, unique;

* freelancers:
  * id: varchar, primary key, not null;
  * fullName: varchar, non null;
  * hourRate: varchar, not null;
  * position: varchar, not null;
  * availableAmountOfHours: varchar, not null;
  * employmentType: varchar, not null;
  * workExperience: varchar, not null;
  * englishLevel: varchar, not null;
  * image: varchar, default - null;
  * otherExperience: varchar, not null, default - '';
  * isPublished: tinyint, default - '0';
  * createdAt: datetime, not null, default - current_timetamp;
  * updatedAt: datetime, not null, default - current_timetamp on update current_timetamp;
  * userId: varchar, default - null, unique;
  * categoryId: varchar, default - null;

* freelancers_skills_skills:
  * freelancersId: varchar, primary key, not null;
  * skillsId: varchar, primary key, not null;

* invitations:
  * id: varchar, primary key, not null;
  * freelancersId: varchar, default - null;
  * jobId: varchar, default - null;
  * employerId: varchar, default - null;

* jobs: 
  * id: varchar, primary key, not null;
  * title: varchar, not null;
  * description: text, not null;
  * position: archar, not null;
  * employmentType: varchar, not null;
  * hourRate: varchar, not null;
  * availableAmountOfHours: varchar, not null;
  * workExperience: varchar, not null;
  * englishLevel: varchar, not null;
  * otherExperience: text, not null;
  * isPublished: tinyint, default - '1';
  * createdAt: datetime, not null, default - current_timetamp;
  * updatedAt: datetime, not null, default - current_timetamp on update current_timetamp;
  * categoryId: varchar, default - null;
  * employerId: varchar, default - null;

* jobs_countries_countries:
  * jobsId: varchar, primary key, not null;
  * countriesId: varchar, primary key, not null;

* jobs_skills_skills:
  * jobsId: varchar, primary key, not null;
  * skillsId: varchar, primary key, not null;

* message: 
  * id: varchar, primary key, not null;
  * text: varchar, not null;
  * sender: varchar, not null;
  * createdAt: datetime, not null, default - current_timetamp;
  * updatedAt: datetime, not null, default - current_timetamp on update current_timetamp;
  * chatId: varchar, default - null;

* offer:
  * id: varchar, primary key, not null;
  * hourRate: varchar, default - null;
  * isAccepted: tinyint, not null, default - '0';
  * createdDate: datetime, not null, default - current_timetamp;
  * freelancerId: varchar, default - null; 

* proposal_freelancers:
  * id: varchar, primary key, not null;
  * coverLetter:  varchar, not null;
  * hourRate: varchar, default - null;
  * filePath: varchar, not null;
  * createdDate: datetime, not null, default - current_timetamp;
  * freelancerId: varchar, default - null; 
  * jobId: varchar, default - null; 

* skills:
  * id: varchar, primary key, not null;
  * name: varchar, not null, unique;

* work_history:
  * id: int, primary key, not null, auto increment;
  * company: varchar, not null;
  * workPosition: varchar, not null;
  * period: varchar, not null;
  * freelancerId: varchar, default - null;


## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

