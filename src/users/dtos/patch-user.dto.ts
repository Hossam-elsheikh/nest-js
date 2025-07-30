import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';

// this will inherits all the property from CreateUserDto and make them all optional
export class PatchUserDTO extends PartialType(CreateUserDTO) {}
