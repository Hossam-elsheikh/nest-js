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

// this is a workaround for newer versions of TypeORM
if (!global.crypto) {
  const crypto = require('crypto');
  global.crypto = crypto;
}
@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports:[],
      inject:[],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities:true, // auto load entities instead of providing them in the entities array
        synchronize: true, // warning, auto create the db on every app launch, don't use in production
        port: 5432,
        username: 'postgres',
        password: 'pwd1234', // your server pwd
        database: 'nestjs-blog', // your db name
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
