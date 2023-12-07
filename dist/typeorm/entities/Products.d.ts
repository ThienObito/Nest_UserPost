import { OrderDetail } from './OrderDetails';
export declare class Product {
    id: number;
    id_product: number;
    name_product: string;
    product_information: string;
    size: string;
    image: string;
    cost: number;
    price: number;
    color: string;
    quantity: number;
    created_at: Date;
    orderdetail: OrderDetail;
}
