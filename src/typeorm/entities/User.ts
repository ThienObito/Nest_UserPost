import {IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'users' })
export class User {
  comparePassword(password: string) {
    throw new Error('Method not implemented.');
  }
 
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsOptional()
  id: number;
  

  @Column({ unique: true })
  @IsNotEmpty()
  fullname: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({unique : true})
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;

  @Column({default: 'A/V' })
  @IsOptional()
  address: string;

  @Column({ default: '1970-01-01' })
  @IsOptional()
  dob: Date;

  @Column({default: 0})
  @IsOptional()
  sex: boolean;

  @Column({default: () => 'CURRENT_TIMESTAMP' })
  @IsOptional()
  createdAt: Date;

}

