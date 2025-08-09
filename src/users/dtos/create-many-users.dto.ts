import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { Type } from 'class-transformer';

export class CreateManyUsersDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(()=>CreateUserDTO)
  users: CreateUserDTO[];
}
