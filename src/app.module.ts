import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import envValidations from './config/env.validations';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
// this is a workaround for newer versions of TypeORM
if (!global.crypto) {
  const crypto = require('crypto');
  global.crypto = crypto;
}

const ENV = process.env.NODE_ENV; // this prvoides the current environment

@Module({
  imports: [
    UsersModule,
    PostsModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forRoot({
      isGlobal: true, // make it available in all modules
      // envFilePath:['.env.development']
      envFilePath: !ENV ? '.env' : `.env.${ENV}`, // loads the proper .env file
      load: [appConfig, databaseConfig],
      validationSchema: envValidations, // enabling env validating with joi
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // you can access properties with the namespace you difned in the config file registerAs function
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'), // warning, auto create the db on every app launch, don't use in production
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'), // your server pwd
        host: configService.get('database.host'),
        database: configService.get('database.name'), // your db name
      }),
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard, // this apply this guard globally
    },
    AccessTokenGuard // dependency
  ],
})
export class AppModule {}
