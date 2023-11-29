import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/products.controller';
import { ProductService } from './service/products.service';
import { Product } from 'src/typeorm/entities/Products';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
