import { IsInt, IsOptional, IsString } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ProductDetail{
  @Column({ unique: true })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  product_detail_id: string;

  @IsOptional()
  id_product: number;

  @IsInt()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  size: string;
}
