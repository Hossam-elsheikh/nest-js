import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    // create a mock
    // aim of the test is to test if the createUser in the user.service triggers the createUser in create.user.provider
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDTO) =>
        Promise.resolve({
          id: 555,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName || '',
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DataSource, useValue: {} }, // mocking datasource so the repository works properly
        { provide: getRepositoryToken(User), useValue: {} }, // mocking the user repository
        { provide: CreateGoogleUserProvider, useValue: {} }, // mocking provider with an empty class
        { provide: FindOneByGoogleIdProvider, useValue: {} },
        { provide: FindOneByEmailProvider, useValue: {} },
        { provide: CreateUserProvider, useValue: mockCreateUserProvider }, // providing the mock instead of the empty obj
        { provide: UsersCreateManyProvider, useValue: {} },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it(' should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });
    it('should call createUser at create.user.provider', async () => {
      let user = await service.createUser({
        firstName: 'hos',
        lastName: 'moh',
        email: 'hos.moh@gmail.com',
        password: 'HosH1344',
      });
      expect(user.firstName).toEqual('hos');
    });
  });
});
