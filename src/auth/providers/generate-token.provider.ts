import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { ActiveUserInterface } from '../interfaces/active-user.interface';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    private readonly jwtService: JwtService, // imported from jwt package
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userID: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userID,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    // generate access token
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserInterface>>(
        user.id,
        this.jwtConfiguration.accessTokenTTL,
        {
          email: user.email,
        },
      ),
      // generate refresh token

      this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL),
    ]);
    return { accessToken, refreshToken };
  }
}
