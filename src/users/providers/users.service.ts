import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { response } from 'express';
import { error } from 'console';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
import { CreateGoogleUserProvider } from './create-google-user.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // injecting the profile config
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    // injecting user repo
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly createUserProvider:CreateUserProvider,
    private readonly findOneByEmailProvider:FindOneByEmailProvider,
    private readonly findOneByGoogleIdProvider:FindOneByGoogleIdProvider,
    private readonly createGoogleUserProvider:CreateGoogleUserProvider
  ) {}

  public async createUser(createUserDto: CreateUserDTO) {
    return this.createUserProvider.createUser(createUserDto)
  }


  public findAll(
    getUserParamsDto: GetUsersParamDTO,
    limit: number,
    page: number,
  ) {
    // demonstration of custom exception
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        description: 'API endpoint was prementatly moved',
      },
    );
  }

  public async findOneById(id: number) {
    let user;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment!, please try again later',
        { description: 'Error connecting to the database' },
      );
    }
    if (!user) {
      throw new BadRequestException('user id is not exist');
    }
    return user;
  }


  public async createMany(createManyUsersDto:CreateManyUsersDto){
    return await this.usersCreateManyProvider.createMany(createManyUsersDto)
  }

  public async findOneByEmail(email:string){
    return this.findOneByEmailProvider.findUserByEmail(email)
  }

  public async findOneByGoogleId(googleId:string){
      return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId)
  }

  public async createGoogleUser(googleUser:GoogleUser){ // this method doen't has a controller method, so we build GoogleUser as interface not dto,  
    return await this.createGoogleUserProvider.createGoogleUser(googleUser)
  }
}
