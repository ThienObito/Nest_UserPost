import { Repository } from 'typeorm';
import { Order } from 'src/typeorm/entities/Orders';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';
export declare class OrderService {
    private readonly OrderRepository;
    constructor(OrderRepository: Repository<Order>);
    findAll(): Promise<Order[]>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    update(id: number, UpdateOrderDto: CreateOrderDto): Promise<Order>;
    delete(id: number): Promise<void>;
    findOne(id: number): Promise<Order | undefined>;
}
