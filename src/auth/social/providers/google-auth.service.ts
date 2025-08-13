import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  // we implement OnModuleInit so that oauthClient is avalable once the module class is instantiated
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
    // by that whenever the authModule is initalized the oauthClient will be filled with those data
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // verify the google token sent by user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      console.log(loginTicket);

      // extract the payload from the google JWT
      const payload = loginTicket.getPayload();

      if (
        !payload ||
        !payload.email ||
        !payload.sub ||
        !payload.given_name ||
        !payload.family_name
      ) {
        throw new Error('Invalid Google token payload');
      }

      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = payload;
      // find the user in our db by googleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      // generate the token if exist
      if (user) {
        const { accessToken, refreshToken } =
          await this.generateTokenProvider.generateTokens(user);
      }
      // create account and then generate if user doesn't exist
      const newUser = await this.usersService.createGoogleUser({
        email,
        googleId,
        firstName,
        lastName,
      });
      return this.generateTokenProvider.generateTokens(newUser);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
