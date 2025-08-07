import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';



@Injectable()
export class UsersService {

  constructor(
    @Inject(forwardRef(() => AuthService)) 
    private readonly authService: AuthService,


    // injecting user repo
    @InjectRepository(User)
    private userRepository:Repository<User>
  ) {}

  public async createUser(createUserDto:CreateUserDTO){
    // simplest shape, will refine later
    const existingUser = await this.userRepository.findOne({
      where:{
        email:createUserDto.email
      }
    })
    // handling exception later

    let newUser = this.userRepository.create(createUserDto) // not saved yet in the db, can be manubiluated
    newUser = await this.userRepository.save(newUser)
    return newUser
  }

  public findAll(
    getUserParamsDto: GetUsersParamDTO,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    return [
      { firstName: 'john', email: 'john@doe.com' },
      { firstName: 'ali', email: 'ali@ahmed.com' },
    ];
  }

  public async findOneById(id: number) {

    return await this.userRepository.findOneBy({id})
  }
}
