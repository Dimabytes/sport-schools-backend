import * as nodemailer from 'nodemailer';
import * as process from 'process';

export class MailService {
  private transporter: nodemailer.Transporter;
  constructor(transporter) {
    this.transporter = transporter;
  }

  public static async getService(): Promise<MailService> {
    if (process.env.NODE_ENV === 'production') {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_LOGIN,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      return new MailService(transporter);
    } else {
      const testAccount = await nodemailer.createTestAccount();
      console.log(
        `MailService[getService] testAccount: ${JSON.stringify(testAccount)}`,
      );

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      return new MailService(transporter);
    }
  }

  public sendMail(opts: nodemailer.SendMailOptions): Promise<unknown> {
    console.log(`MailService[sendMail] send email: ${JSON.stringify(opts)}`);
    return this.transporter.sendMail(opts);
  }
}
