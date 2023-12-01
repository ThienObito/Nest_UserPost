import { OrderDetailService } from '../services/oderdetail.service';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';
import { OrderDetail } from 'src/typeorm/entities/OrderDetails';
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    findAll(): Promise<OrderDetail[]>;
    getOrderDetailById(id: number): Promise<OrderDetail>;
    createOrderDetail(createOrderDto: CreateOrderDto): Promise<OrderDetail>;
    updateOrderDetail(id: number, updateOrderDto: CreateOrderDto): Promise<OrderDetail>;
    deleteOrderDetail(id: number): Promise<void>;
}
