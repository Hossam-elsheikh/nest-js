import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDTO } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';


// this comment is for compodoc declaration 
/**
 * Class to connect to users table and perform business operations 
 */
@Injectable()
export class UsersService {
  /**
   * injecting auth service
   * @param authService 
   */
  constructor(
    @Inject(forwardRef(() => AuthService)) // this is in circular dependency only
    private readonly authService: AuthService,
  ) {}
  // using dummy data for demonstration
  //this comment is for compodoc declaration 
  /**
   * getting all users details
   * @param getUserParamsDto user schema
   * @param limit numbers of results
   * @param page location of the page
   * @returns array of users
   */
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
  /**
   * find one user by it's id
   * @param id id of the user
   * @returns user details object
   */
  public findOneById(id: string) {
    return {
      id: '1234',
      name: 'fathy',
      email: 'fathy@fmail.com',
    };
  }
}
