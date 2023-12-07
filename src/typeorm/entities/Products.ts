import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetail } from './OrderDetails';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsOptional()
  id: number;

  @Column()
  id_product: number;

  @Column({ unique: true })
  @IsNotEmpty()
  name_product: string;

  @Column()
  @IsNotEmpty()
  product_information: string;

  @Column()
  @IsNotEmpty()
  size: string;

  @Column()
  image: string;

  @Column()
  @IsOptional()
  cost: number;

  @Column()
  @IsOptional()
  price: number;

  @Column()
  @IsOptional()
  color: string;

  @Column()
  @IsOptional()
  quantity: number;

  @Column()
  @IsOptional()
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date; 

  @ManyToOne(() => OrderDetail, (orderdetail) => orderdetail.products)
  @JoinColumn({name:'id_product'})
  orderdetail: OrderDetail
}
