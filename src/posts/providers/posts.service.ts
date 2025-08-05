import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  // injecting user service
  constructor(private readonly userService: UsersService) {}
  public findAll(userId: string) {
    const user = this.userService.findOneById(userId);
    return [
      {
        user,
        title: 'new post',
        content: 'content ',
      },
      {
        user,
        title: 'new post2',
        content: 'content2',
      },
    ];
  }
}
