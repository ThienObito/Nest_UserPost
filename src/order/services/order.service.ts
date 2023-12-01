import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/typeorm/entities/Orders';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
  ) {}
  async findAll(): Promise<Order[]> {
    return this.OrderRepository.find();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const Order = this.OrderRepository.create(createOrderDto);
    return await this.OrderRepository.save(Order);
  }

  async update(id: number, UpdateOrderDto: CreateOrderDto): Promise<Order> {
    await this.OrderRepository.update(id, UpdateOrderDto);
    return this.OrderRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.OrderRepository.delete(id);
  }

  async findOne(id: number): Promise<Order | undefined> {
    return this.OrderRepository.findOne({ where: { id } });
  }
}
