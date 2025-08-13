import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDTO } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserInterface } from '../interfaces/active-user.interface';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SigninProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokenProvider:GenerateTokenProvider
  ) {}
  public async signIn(signinDto: SigninDTO) {
    const user = await this.userService.findOneByEmail(signinDto.email); // this throw the exception if fails

    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signinDto.password,
        user.password||'',
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare the password',
      });
    }
    if (!isEqual) {
      throw new UnauthorizedException('incorrect password');
    }

    return await this.generateTokenProvider.generateTokens(user)

  }
}
