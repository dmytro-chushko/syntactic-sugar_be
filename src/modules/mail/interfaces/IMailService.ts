export interface IMailService {
  sendActivationMail(to: string, html: string, subject: string): Promise<void>;
}
