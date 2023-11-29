import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'products' })
export class product {
  @Column({ unique: true })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsOptional()
  category_id: number;

  @Column({ unique: true })
  @IsOptional()
  name_product: string;

  @Column()
  @IsNotEmpty()
  id_product: number;

  @Column()
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
  created_at: Date;
}
