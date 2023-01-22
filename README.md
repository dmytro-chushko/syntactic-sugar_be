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

## Config for .env file:

* **Database**:

  * PORT=5000
  * MYSQL_HOST=localhost
  * MYSQL_USER=root
  * MYSQL_DB=test_freelancer
  * MYSQL_PASSWORD=12345
  * MYSQL_PORT=3306
  * MYSQL_ROOT_PASSWORD=root
  * CLIENT_HOST = http://localhost:4200

* **GOOGLE OAUTH 2.0**:

  * GOOGLE_CLIENT_ID = "12345678-templateaorap933406d1vg3bbte7j8m.apps.googleusercontent.com"
  * GOOGLE_SECRET = "TEMPLATE-8IVUyAQhCreZu2KDDqeBhQvKlAnd"

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

## Database 

![image](https://user-images.githubusercontent.com/93491902/213924105-8fea848c-8bf7-4226-a1f4-407c97817483.png)


**Entities**: 

* users:
  * id: varchar, primary key;
  * email: varchar, user email;
  * password: varchar, user password for app;
  * role: varchar, example: "GUEST";

* categories:
  * id: varchar, primary key, not null;
  * name: varchar, example: IT;
  
* chat:
  * id: varchar, primary key, not null;
  * createdAt: datetime, example: 10.02.2023;
  * updatedAt: datetime, example: 10.02.2023;
  * freelancerId: varchar, freelncer`s id, example: 986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e;

* countries:
  * id: varchar, primary key, not null;
  * name: varchar, example: Ukraine;
 
* education:
  * id: int, not null, primary key, auto increment;
  * institute: varchar, example: NUFT;
  * occupation: varchar, example: master;
  * period: varchar, study years: 2008-2013;
  * freelancersId: varchar,  freelncer`s id;

* employers: 
  * id: varchar, primary key, not null;
  * fullName: varchar, employer`s name;
  * companyName: varchar, employer`s company name;
  * position: varchar, employer`s position in company;
  * phone: varchar, employer`s phone;
  * linkedIn: varchar, employer`s prifile link to LinkedIn;
  * website: varchar, company`s website;
  * aboutUs: varchar, descriptions of company and its work;
  * image: varchar, employer`s avatar;
  * userId: varchar, user id;

* freelancers:
  * id: varchar, primary key, not null;
  * fullName: varchar, frelancer`s full name;
  * hourRate: varchar, freelancer`s desire salary;
  * position: varchar, freelancer`s position as he want;
  * availableAmountOfHours: varchar, fuul time or part time working;
  * employmentType: varchar, where freelancer want to work: office, remote etc.;
  * workExperience: varchar, freelancer`s experience in years;
  * englishLevel: varchar, freelancer`s english level;
  * image: varchar, freelancer`s avatar;
  * otherExperience: varchar, other experience if freelancer want to add;
  * isPublished: tinyint, default - '0';
  * createdAt: datetime, created date of freelancer profile;
  * updatedAt: datetime, updated date of freelancer profile;
  * userId: varchar, id of user;
  * categoryId: varchar, id of category;

* freelancers_skills_skills:
  * freelancersId: varchar, id of freelancer;
  * skillsId: varchar, id of freelancer`s skills;

* invitations:
  * id: varchar, primary key, not null;
  * freelancersId: varchar, freelancer`s id for who was sent invitation;
  * jobId: varchar, job`s id for which was send invitation;
  * employerId: varchar, employer id who sent invitztion;

* jobs: 
  * id: varchar, primary key, not null;
  * title: varchar, job title;
  * description: text, description of a job;
  * position: varchar, position in company for which employer is looking for employee;
  * employmentType: varchar, working place: remote, office etc.;
  * hourRate: varchar, salary;
  * availableAmountOfHours: varchar, full or part time;
  * workExperience: varchar, required experience;
  * englishLevel: varchar, required english level;
  * otherExperience: text, required experience;
  * isPublished: tinyint, default - '1';
  * createdAt: datetime, date when job was created;
  * updatedAt: datetime, date when job was updated;
  * categoryId: varchar, category id where employer find emloyee;
  * employerId: varchar, employer who created a job;

* jobs_countries_countries:
  * jobsId: varchar, primary key, not null;
  * countriesId: varchar, primary key, not null;

* jobs_skills_skills:
  * jobsId: varchar, primary key, not null;
  * skillsId: varchar, primary key, not null;

* message: 
  * id: varchar, primary key, not null;
  * text: varchar, message text;
  * sender: varchar, who sent message;
  * createdAt: datetime, date when message was typed;
  * updatedAt: datetime, date when message was updated;
  * chatId: varchar, chat id where message was sent;

* offer:
  * id: varchar, primary key, not null;
  * hourRate: varchar, employer`s proposal for salary;
  * isAccepted: tinyint, not null, default - '0';
  * createdDate: datetime, date when offer was created;
  * freelancerId: varchar, freelancer id for for who offer was sent; 

* proposal_freelancers:
  * id: varchar, primary key, not null;
  * coverLetter:  varchar, cover letter of freelancer;
  * hourRate: varchar, salary;
  * filePath: varchar, path to freelancer`s CV on server;
  * createdDate: datetime, date when proposal was created;
  * freelancerId: varchar,freelancer id who creater this proposal; 
  * jobId: varchar, job id for which freelancer created proposal; 

* skills:
  * id: varchar, primary key, not null;
  * name: varchar, not null, unique;

* work_history:
  * id: int, primary key, not null, auto increment;
  * company: varchar, company name where freelancer has worked;
  * workPosition: varchar, freelancer`s position in that company;
  * period: varchar, period when freelancer has worked in that company;
  * freelancerId: varchar, freelancer`s id;


## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

