import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { GetUsersParamDTO } from './dtos/get-users-params.dto';
import { PatchUserDTO } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'You are fetching all users';
  }
  @Get('/:id') // you can make the id optional by wrapping it like this {:id}
  public getUser(
    @Param() params: any,
    @Param('id', ParseIntPipe) id: number | undefined, // converts id from string to integer
    // you can't validate an optional param through normal use of pipes, it'll be done through dto in the next line
    @Param() getUsersParamDto: GetUsersParamDTO,
    @Query() query: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(params, query, page, limit, getUsersParamDto);
    return 'You are fetching all users';
  }
  @Post()
  public createUser(
    // @Body(new ValidationPipe()) createUserDto: CreateUserDTO,
    // you should remove the validation pipe cus it's passed in the main.ts file as a global pipe
    @Body() createUserDto: CreateUserDTO,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(createUserDto, headers, ip);
    // createUserDto isn't actually an instance of CreateUserDTO without the transform property set to true in the validation pipe config object
    return 'You are creating a user!';
  }

  //   you can grap the request itself not just the body, but don't do this unless urge need, it has its disadvs
  //   public createUser(@Req() req: Request) {
  //     console.log(req);
  //     return 'You are creating a user!';
  //   }

  @Patch()
  public patchUser(@Body() patchUserDto:PatchUserDTO){
    return patchUserDto
  }
}
