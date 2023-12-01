import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Order } from 'src/typeorm/entities/Orders';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  async findAll(): Promise<Order[]> {
    console.log('tìm kiếm tất cả thông tin Order');
    return this.orderService.findAll();
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    console.log('đã tạo một thông tin Order');
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: CreateOrderDto,
  ): Promise<Order> {
    console.log('cập nhật Order', id);
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    console.log('đã xóa Order', id);
    return this.orderService.delete(id);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }
}
