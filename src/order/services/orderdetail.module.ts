import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/typeorm/entities/OrderDetails';
import { OrderDetailService } from './oderdetail.service';
import { OrderDetailController } from '../controllers/orderdetail.controller';





@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
