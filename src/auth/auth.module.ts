import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SigninProvider } from './providers/signin.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { GoogleAuthController } from './social/google-auth.controller';
import { GoogleAuthService } from './social/providers/google-auth.service';
import jwtConfig from './config/jwt.config';

@Module({
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider, // we use this structure to provide hashing provider which is an abstract class
      useClass: BcryptProvider,
    },
    SigninProvider,
    GenerateTokenProvider,
    RefreshTokenProvider,
    GoogleAuthService,
  ],
  exports: [AuthService, HashingProvider],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()), // asProvider save extra  useFactory implementation poilerplate code
  ],
})
export class AuthModule {}
