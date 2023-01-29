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
  UPDATE_FREELANCER = 'update-freelancer',
  GET_PROFILE = 'profile',
  EDIT_PUBLISHED = 'create/published',
  JOBS = 'jobs',
  CREATE_JOB = 'create-new-job',
  GET_JOBS = 'get-all-jobs',
  GET_JOBS_BY_EMPLOYER = 'get-jobs-by-employer',
  UPDATE_JOB_BY_ID = 'update-job/:id',
  REMOVE_JOB_BY_ID = 'remove-job/:id',
  GET_JOB_BY_ID = 'get-job-by-id/:id',
  GET_JOB_BY_PROPOSALS = 'get-job-by-proposals',
  PUBLISH_JOB = 'publish-job/:id',
  CREATE_EMPLOYER = 'create',
  UPDATE_EMPLOYER = 'update-employer',
  PROPOSAL = 'proposal',
  CREATE_PROPOSAL = 'create',
  UPLOAD_IMAGE = 'image',
  FILES = 'files',
  INVITATION = 'invitation',
  SEND = 'send-invitation',
  ALL_FREELANCERS = 'get-all-profiles',
  GET_PROPOSALS_BY_JOB_ID = 'get-proposals-by-job-id/:id',
  GET_PROPOSAL_BY_ID = 'get-proposal-by-id/:id',
  CHAT = 'chat',
  MESSAGES = 'messages',
  CREATE_CHAT = 'create-chat',
  CREATE_MESSAGE = 'create-message',
  GET_CHAT_MESSAGES = 'messages/:id',
  GET_CHATS_BY_USER = 'get-chats-by-user',
  OFFER = 'offer',
  CREATE_OFFER = 'create-offer',
  GET_FREELANCER_BY_ID = 'get-freelancer-by-id/:id',
  CURRENT_USER = 'current-user',
  UPDATE_OFFER = 'update-offer',
  GET_NOTIFICATIONS_BY_PROFILE = 'get-notifications-by-profile',
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
  INVITATION = 'INVITATION',
  MESSAGES = 'MESSAGES_SERVICE',
  CHAT = 'CHAT_SERVICE',
  OFFER = 'OFFER_SERVICE',
  NOTIFICATION = 'NOTIFICATION_SERVICE',
}

export enum UserRoles {
  EMPLOYER = 'EMPLOYER',
  FREELANCER = 'FREELANCER',
  GUEST = 'GUEST',
}

export const ROLES_KEY = 'roles';

export enum WS_EVENTS {
  MESSAGE = 'message',
  JOIN = 'join',
  LEAVE = 'leave',
}

export const SUBJECT = {
  CONFIRM_EMAIL: 'Confirm email address on Freelancer app',
  RESET_PASSWORD: 'Reset password on Freelance app',
};

export enum NotificationType {
  MESSAGE = 'message',
  INVITATION = 'invitation',
  PROPOSAL = 'proposal',
  OFFER = 'offer',
}
