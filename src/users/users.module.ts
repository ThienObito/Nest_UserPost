import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { UsersService } from './services/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/typeorm/entities/jwt.strategy';
import { UsersController } from './controllers/users/users.controller';
import { ProductController } from 'src/products/controllers/products.controller';
import { ProductService } from 'src/products/service/products.service';
import { Product } from 'src/typeorm/entities/Products';
import { OrderService } from 'src/order/services/order.service';
import { Order } from 'src/typeorm/entities/Orders';
import { OrderController } from 'src/order/controllers/order.controller';
import { OrderDetail } from 'src/typeorm/entities/OrderDetails';

@Module({
  imports: [TypeOrmModule.forFeature([User,Product,Order,OrderDetail]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key',
    }),],
  controllers: [UsersController,ProductController,OrderController],
  providers: [JwtStrategy,UsersService,ProductService,OrderService],
})
export class UsersModule {}
