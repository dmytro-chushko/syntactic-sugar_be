export interface IMailService {
  sendActivationMail(to: string, link: string);
}
