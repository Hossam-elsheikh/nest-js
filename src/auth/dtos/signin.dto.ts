import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SigninDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
