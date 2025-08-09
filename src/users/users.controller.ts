import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { GetUsersParamDTO } from './dtos/get-users-params.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from './dtos/create-user.dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  public CreateUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto); // this not needed to be async
  }

  @Post('create-many')
  public createManyUsers(@Body() createUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createUsersDto);
  }

  @Get('/:id')
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDTO,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(10), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUserParamDto, limit, page);
  }
}
