import { IsInt, IsDate, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateOrderDto {
  @Column({ unique: true })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsOptional()
  order_id: number;

  @IsDate()
  @IsOptional()
  order_date: Date;

  @IsString()
  @IsOptional()
  customer_note: string;

  @IsString()
  @IsOptional()
  order_status: string;

  @IsString()
  @IsOptional()
  payment_method: string;

  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  customer_phone: string;

  @IsString()
  @IsNotEmpty()
  customer_email: string;

  @IsString()
  @IsNotEmpty()
  customer_address: string;

  @IsInt()
  @IsOptional()
  shipping_money: number;

  @IsString()
  @IsOptional()
  shipping_status: string;

  @IsString()
  @IsOptional()
  payment_status: string;
}
