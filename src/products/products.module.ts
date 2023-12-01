import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/products.controller';
import { ProductService } from './service/products.service';
import { Product } from 'src/typeorm/entities/Products';
import { OrderDetail } from 'src/typeorm/entities/OrderDetails';
import { Order } from 'src/typeorm/entities/Orders';
import { OrderController } from 'src/order/controllers/order.controller';
import { OrderDetailController } from 'src/order/controllers/orderdetail.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product,OrderDetail,Order]),
  ],
  controllers: [ProductController,OrderController,OrderDetailController],
  providers: [ProductService,OrderController,OrderDetailController],
})
export class ProductModule {}
