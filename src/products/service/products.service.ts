import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Products';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/CreateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
          // orderdetail: true,
      },});
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async update(
    id: number,
    UpdateProductDto: CreateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, UpdateProductDto);
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async findOne(id: number): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: { id } });
  }
}
