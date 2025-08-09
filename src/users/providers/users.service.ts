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

    // injecting the datasource
    private readonly dataSource: DataSource,

    private readonly usersCreateManyProvider: UsersCreateManyProvider
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

    let newUser = this.userRepository.create(createUserDto);

    try {
      newUser = await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment!, please try again later',
        { description: 'Error connecting to the database' },
      );
    }
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
}
