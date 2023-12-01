import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id:number;

  @Column()
  order_id : number;

  @Column()
  order_status: string;

  @Column({ nullable: true })
  order_date: Date;
  
  @Column()
  payment_method: string;

  @Column({ nullable: true })
  customer_note: string;

  @Column()
  customer_name: string;

  @Column()
  customer_phone: string;

  @Column()
  customer_email: string;

  @Column()
  customer_address: string;

  @Column({ nullable: true })
  shipping_money: number;

  @Column({ nullable: true })
  shipping_status: string;

  @Column({ nullable: true })
  payment_status: string;

  
}
