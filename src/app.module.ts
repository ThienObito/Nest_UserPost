import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { LoginDto } from './users/dtos/Login.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'database_tobi',
      entities: [User,LoginDto],
      synchronize: true,
    }),
    UsersModule ,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
