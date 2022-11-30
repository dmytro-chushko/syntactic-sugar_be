export enum Routes {
  AUTH = 'auth',
  REGISTER = 'register',
  CONFIRM = 'confirm',
  USER = 'users',
  FORGOT_PASS = 'forgotpassword',
  SIGNUP_GOOGLE = 'google/signup',
  LOGIN = 'login',
  GOOGLE_LOGIN = 'google/login',
  FREELANCER = 'freelancer',
  CREATE_FREELANCER = 'create',
  EMPLOYER = 'employer',
  CREATE_EMPLOYER = 'create',
  JOB = 'job',
  JOB_CREATE = 'create',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USER = 'USER_SERVICE',
  MAIL = 'MAIL_SERVICE',
  TOKEN = 'TOKEN_SERVICE',
  FREELANCER = 'FREELANCER_SERVICE',
  EMPLOYER = 'EMPLOYER_SERVICE',
  JOB_SERVICES = 'JOB_SERVICE',
}

export enum UserRoles {
  EMPLOYER = 'EMPLOYER',
  FREELANCER = 'FREELANCER',
  GUEST = 'GUEST',
}

export const ROLES_KEY = 'roles';
