export class CreateOrderDetailDto {
     order_detail_id: number;
     order_id : number;
     id_product: number;
     name: string;
     img:string;
     price: number; 
     quantity: number;
     discount: number;
     created_at: Date;
   }
   