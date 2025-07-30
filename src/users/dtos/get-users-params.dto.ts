import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

// we're creating this to validate an optional param which is not possiple in the controller pipes
export class GetUsersParamDTO {
  @IsOptional()
  @IsInt() 
  // this IsInt will throw an error you have to use Type from class-transformer to transform it to number
  // because params and querys are always recieved as a string
  @Type(() => Number)
  id?: number;
}
