import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    private readonly dataSource: DataSource,

  ) {}
  // creating a transaction through creating multible users
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];
    // create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    // connect query runner to datasource
    try {
      await queryRunner.connect();
      // start transaction
      // after this line whatever crud operation you do is a part of this transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Something went wrong, try again later!',
      );
    }
    try {
      // this is not a practical example, it's just for demonstration
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // commit if successful
      await queryRunner.commitTransaction();
    } catch (error) {
      // rollback if unsuccessful
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        'could not comlete the transaction, some users has not been created',
        {
          description: String(error), // this is important to send the specific error
        },
      );
    } finally {
      // release the connection
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection!', {
          description: String(error),
        });
      }
    }
    return { users: newUsers, message: 'users created successfully!' };
  }
}
