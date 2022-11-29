export enum Routes {
  AUTH = 'auth',
  REGISTER = 'register',
  CONFIRM = 'confirm',
  USER = 'users',
  EMPLOYER = 'employer',
  FORGOT_PASS = 'forgotpassword',
  RESET_PASS = 'resetpassword',
  SIGNUP_GOOGLE = 'google/signup',
  LOGIN = 'login',
  GOOGLE_LOGIN = 'google/login',
  JOBS = 'jobs',
  CREATE_JOB = 'create-new-job',
  CREATE_EMPLOYER = 'create/employer',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USER = 'USER_SERVICE',
  MAIL = 'MAIL_SERVICE',
  JOBS = 'JOBS_SERVICE',
  EMPLOYER = 'EMPLOYER_SERVICE',
  TOKEN = 'TOKEN_SERVICE',
}

export enum UserRoles {
  JOB_OWNER = 'JOB_OWNER',
  FREELANCER = 'FREELANCER',
  GUEST = 'GUEST',
}

export const ROLES_KEY = 'roles';
