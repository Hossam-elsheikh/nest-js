import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  public async sendUserWelcome(user: User): Promise<void> {
    
    await this.mailService.sendMail({
      to: user.email,
      from:`OnBoarding Team <nojeed@hello.com>`,
      subject:"Welcome to NestJs Blog",
      template:'./welcome',
      context:{
        // propeties to use in the template
        name:user.firstName,
        email:user.email,
        loginUrl:'http://localhost:3000'
      }
    });
  }
}
