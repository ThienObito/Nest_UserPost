import { Repository } from 'typeorm';
import { OrderDetail } from 'src/typeorm/entities/OrderDetails';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';
export declare class OrderDetailService {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: Repository<OrderDetail>);
    findAll(): Promise<OrderDetail[]>;
    create(createOrderDto: CreateOrderDto): Promise<OrderDetail>;
    delete(id: number): Promise<void>;
    getOrderDetailById(id: number): Promise<OrderDetail>;
    findOne(id: number): Promise<OrderDetail | undefined>;
    update(id: number, updateOrderDto: CreateOrderDto): Promise<OrderDetail>;
}
