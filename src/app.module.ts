import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { LoginDto } from './users/dtos/Login.dto';
import { Product } from './typeorm/entities/Products';
import { Order } from './typeorm/entities/Orders';
import { OrderDetail } from './typeorm/entities/OrderDetails';
import { OrderDetailModule } from './order/services/orderdetail.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'database_tobi',
      entities: [User,LoginDto,Product,Order,OrderDetail],
      synchronize: true,
    }),
    UsersModule ,OrderDetailModule,OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
