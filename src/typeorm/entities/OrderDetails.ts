import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
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
}
