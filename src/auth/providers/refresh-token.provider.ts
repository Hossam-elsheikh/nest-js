import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refesh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokenProvider } from './generate-token.provider';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserInterface } from '../interfaces/active-user.interface';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // verify the refresh-token
      const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserInterface,'sub'>>(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,

          issuer: this.jwtConfiguration.issuer,
        },
      );
      // fetch the user from the db
      const user = await this.userService.findOneById(sub);
      // generate the tokens

      return await this.generateTokenProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
