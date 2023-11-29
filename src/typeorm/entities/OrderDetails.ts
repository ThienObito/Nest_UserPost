import { IsInt, IsDate, IsString, IsOptional } from 'class-validator';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class CreateOrderDetailDto {
  @Column({ unique: true })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsOptional()
  order_id: number;

  @IsInt()
  @IsOptional()
  product_detail_id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  img: string;

  @IsInt()
  @IsOptional()
  price: number;

  @IsInt()
  @IsOptional()
  quantity: number;

  @IsInt()
  @IsOptional()
  discount: number;

  @IsDate()
  @CreateDateColumn()
  create_date: Date;
}
