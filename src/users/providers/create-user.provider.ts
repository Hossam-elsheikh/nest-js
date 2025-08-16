import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,

    @Inject(forwardRef(() => HashingProvider)) // because it's a circular dependency
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDTO) {
    let existingUser;
    // handling exception duplicate key
    try {
      existingUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment!, please try again later',
        { description: 'Error connecting to the database' },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'The user already exist, please check your email',
      );
    }

    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.userRepository.save(newUser);
      try {
        console.log('before sending');
        
        await this.mailService.sendUserWelcome(newUser);
        console.log('email sent');
        
      } catch (error) {
        throw new RequestTimeoutException(error);
      }
      return newUser;
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment!, please try again later',
        { description: 'Error connecting to the database' },
      );
    }
  }
}
