import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) // this is in circular dependency only
    private readonly userService: UsersService,
  ) {}
  public login(email: string, pwd: string, id: string) {
    // we need user service here and auth service there in user service (circular dependedncy)
    const user = this.userService.findOneById(2);
    return 'sample_token';
  }

  public isAuth() {
    return true;
  }
}
