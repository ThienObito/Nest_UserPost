import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Product } from './Products';

@Entity({name:'orderdetails'})

export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_detail_id: number;

  @Column()
  order_id: number;

  @Column()
  id_product: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  discount: number;

  @Column({ nullable: true })
  create_date: Date;

  @OneToMany(() => Product, (product) => product.orderdetail)
  products: Product[];

}
