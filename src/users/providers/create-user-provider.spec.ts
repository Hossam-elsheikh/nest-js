import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { BadRequestException } from '@nestjs/common';
// mocking with jest

type MockRepository<T = any> = Partial<Record<keyof Repository<T extends ObjectLiteral ? T : never>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});
describe('CreateUsersService', () => {
  let provider: CreateUserProvider;
  let usersRepository: MockRepository;
  const user = {
    firstName: 'hos',
    lastName: 'moh',
    email: 'hos@moh.com',
    password: 'Hsdfo223',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        {
          provide: MailService,
          useValue: {
            sendUserWelcome: jest.fn(() => Promise.resolve()), // void
          },
        },
        {
          provide: HashingProvider,
          useValue: { hashPassword: jest.fn(() => user.password) },
          // here we're not concerned with testing the hashing method iteself, we're just insuring that it returns something
        },
      ],
    }).compile();
    provider = module.get<CreateUserProvider>(CreateUserProvider);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it(' should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('createUser', () => {
    describe('when the user email does not exist in db', () => {
      it('should create a new user', async () => {
        // we don't test typeorm methods, we're mocking the returend values
        // we suppose that typeorm is working the way it supposed to work as it's a 3rd party dependeny, it's their responsability
        usersRepository.findOne?.mockReturnValue(null);
        usersRepository.create?.mockReturnValue(user); // this is the user defined above
        usersRepository.save?.mockReturnValue(user);

        const newUser = await provider.createUser(user);
        expect(usersRepository.findOne).toHaveBeenCalledWith({
          where: { email: user.email }, // asserting that findOne has been called properly or not
        });
        expect(usersRepository.create).toHaveBeenCalledWith(user);
        expect(usersRepository.save).toHaveBeenCalledWith(user);
      });
    });
    describe('when the user email exist', () => {
      it('throw BadRequestException', async () => {
        usersRepository.findOne?.mockReturnValue(user.email);
        usersRepository.create?.mockReturnValue(user);
        usersRepository.save?.mockReturnValue(user);
        try {
          const newUser = await provider.createUser(user);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});
