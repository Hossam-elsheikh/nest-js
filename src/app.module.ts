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
import  appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import envValidations from './config/env.validations';
// this is a workaround for newer versions of TypeORM
if (!global.crypto) {
  const crypto = require('crypto');
  global.crypto = crypto;
}

const ENV = process.env.NODE_ENV // this prvoides the current environment

@Module({
  imports: [
    UsersModule,
    PostsModule,
    ConfigModule.forRoot({
      isGlobal:true,     // make it available in all modules
      // envFilePath:['.env.development']      
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,     // loads the proper .env file 
      load:[appConfig,databaseConfig],
      validationSchema:envValidations // enabling env validating with joi
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      // this commented factory before using appConfig in load property above 

      // useFactory: (configService:ConfigService) => ({
      //   type: 'postgres',
      //   // entities: [User],
      //   autoLoadEntities:true, // auto load entities instead of providing them in the entities array
      //   synchronize: true, // warning, auto create the db on every app launch, don't use in production
      //   port: +configService.get('DB_PORT'),
      //   username: configService.get('DB_USER'),
      //   password: configService.get('DB_PWD'), // your server pwd
      //   database: configService.get('DB_NAME'), // your db name
      // }),


      // after creating a separate config files
       useFactory: (configService:ConfigService) => ({
        type: 'postgres',
        // you can access properties with the namespace you difned in the config file registerAs function
        autoLoadEntities:configService.get('database.autoLoadEntities'), 
        synchronize: configService.get('database.synchronize'), // warning, auto create the db on every app launch, don't use in production
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'), // your server pwd
        host:configService.get('database.host'),
        database: configService.get('database.name'), // your db name
      }),
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
