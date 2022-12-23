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
  FREELANCER = 'freelancer',
  CREATE_FREELANCER = 'create',
  GET_PROFILE = 'profile',
  EDIT_PUBLISHED = 'create/published',
  JOBS = 'jobs',
  CREATE_JOB = 'create-new-job',
  GET_JOBS = 'get-all-jobs',
  GET_JOBS_BY_EMPLOYER = 'get-jobs-by-employer',
  UPDATE_JOB_BY_ID = 'udate-job/:id',
  REMOVE_JOB_BY_ID = 'remove-job/:id',
  GET_JOB_BY_ID = 'get-job-by-id/:id',
  GET_JOB_BY_PROPOSALS = 'get-job-by-proposals',
  PUBLISH_JOB = 'publish-job/:id',
  CREATE_EMPLOYER = 'create',
  PROPOSAL = 'proposal',
  CREATE_PROPOSAL = 'create',
  UPLOAD_IMAGE = 'image',
  FILES = 'files',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USER = 'USER_SERVICE',
  MAIL = 'MAIL_SERVICE',
  EMPLOYER = 'EMPLOYER_SERVICE',
  TOKEN = 'TOKEN_SERVICE',
  FREELANCER = 'FREELANCER_SERVICE',
  CATEGORIES = 'CATEGORIES_SERVICE',
  JOBS = 'JOBS_SERVICE',
  SKILLS = 'SKILLS_SERVICE',
  COUNTRIES = 'COUNTRIES_SERVICE',
  PROPOSAL = 'PROPOSALS_FREELANCER',
  FILES = 'FILES',
}

export enum UserRoles {
  EMPLOYER = 'EMPLOYER',
  FREELANCER = 'FREELANCER',
  GUEST = 'GUEST',
}

export const ROLES_KEY = 'roles';
