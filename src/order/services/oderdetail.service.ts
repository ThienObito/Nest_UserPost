import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { OrderDetail } from 'src/typeorm/entities/OrderDetails';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';
import { product } from 'src/typeorm/entities/category';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.find({
      relations: ['products'],
    }
   );
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderDetail> {
    const orderDetail = this.orderDetailRepository.create(createOrderDto);
    return await this.orderDetailRepository.save(orderDetail);
  }

  async delete(id: number): Promise<void> {
    await this.orderDetailRepository.delete(id);
  }

  async getOrderDetailById(id: number): Promise<OrderDetail> {
    console.log('Requested id:', id);

    const conditions: FindOneOptions<OrderDetail> = { where: { id } };
    const orderDetail = await this.orderDetailRepository.findOne(conditions);

    console.log('Found orderDetail:', orderDetail);

    if (!orderDetail) {
      throw new NotFoundException(`Order detail with id ${id} not found`);
    }

    return orderDetail;
  }

  async findOne(id: number): Promise<OrderDetail | undefined> {
    return this.orderDetailRepository.findOne({
      where: { id },
      // relations: { products: true},
    } as FindOneOptions<OrderDetail>);
  }

  async update(
    id: number,
    updateOrderDto: CreateOrderDto,
  ): Promise<OrderDetail> {
    await this.orderDetailRepository.update(id, updateOrderDto);
    return this.orderDetailRepository.findOne({
      where: { id },
    } as FindOneOptions<OrderDetail>);
  }
}
