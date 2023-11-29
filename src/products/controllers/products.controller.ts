import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from '../service/products.service';
import { Product } from 'src/typeorm/entities/Products';
import { CreateProductDto } from '../dtos/CreateProduct.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }
}
