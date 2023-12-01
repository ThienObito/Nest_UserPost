import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrderDetailService } from '../services/oderdetail.service';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';
import { OrderDetail } from 'src/typeorm/entities/OrderDetails';

@Controller('order-details')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  async findAll(): Promise<OrderDetail[]> {
    console.log('tìm kiếm tất cả thông tin Order');
    return this.orderDetailService.findAll();
  }
  @Get(':id')
  async getOrderDetailById(@Param('id') id: number) {
    return this.orderDetailService.findOne(id);
  }
  @Post()
  async createOrderDetail(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderDetail> {
    return this.orderDetailService.create(createOrderDto);
  }

  @Put(':id')
  async updateOrderDetail(
    @Param('id') id: number,
    @Body() updateOrderDto: CreateOrderDto,
  ): Promise<OrderDetail> {
    return this.orderDetailService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrderDetail(@Param('id') id: number): Promise<void> {
    return this.orderDetailService.delete(id);
  }
}
