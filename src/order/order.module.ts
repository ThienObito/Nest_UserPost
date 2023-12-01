import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Orders';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
