import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDTO } from '../dtos/signin.dto';
import { SigninProvider } from './signin.provider';
import { RefreshTokenDto } from '../dtos/refesh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly signinProvider: SigninProvider,
    private readonly refreshTokenProvider:RefreshTokenProvider
  ) {}
  public async login(signinDto: SigninDTO) {
    return await this.signinProvider.signIn(signinDto);
  }

  public async refreshTokens(refreshTokenDto:RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto)
  }
}
