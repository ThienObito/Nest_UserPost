import { Order } from 'src/typeorm/entities/Orders';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(): Promise<Order[]>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    update(id: number, updateOrderDto: CreateOrderDto): Promise<Order>;
    delete(id: number): Promise<void>;
    getOrderById(id: number): Promise<Order>;
}
