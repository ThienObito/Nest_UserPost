export class UpdateOrderDto{
     order_id :number;
     user_id :number
     order_date :Date;
     customer_note: string;
     order_status: string;
     payment_method: string;
     customer_name: string;
     customer_phone: string;
     customer_email: string;
     customer_address: string;
     shipping_money :number;
     shipping_status: string;
     payment_status: string;
}