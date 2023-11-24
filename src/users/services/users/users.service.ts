import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/User';
import {
  UpdateUserParams,
} from '../../../utils/types';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';

@Injectable()
export class UsersService {
  
  
  validateUser(fullname: string, password: string): User | null {
    // Thực hiện kiểm tra thông tin đăng nhập và trả về đối tượng User hoặc null nếu không hợp lệ
    const user: Partial<User> = {
      id: 1,
      fullname: 'example',
      // Các thuộc tính khác của User
    };

    // Kiểm tra logic xác thực ở đây...

    return user as User | null; // hoặc return null nếu không hợp lệ
  }
  login(user: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async updateUserProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<User> {
    const { address, dob, sex } = updateProfileDto;
    let user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    user.address = address;
    user.dob = dob;
    user.sex = sex;

    return this.userRepository.save(user);
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { fullname, phone, password } = createUserDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = this.userRepository.create({
      fullname,
      phone,
      password: hashedPassword,
    });

    // Save the user to the database
    return this.userRepository.save(newUser);
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByUsername(fullname: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { fullname } });
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    console.log('Đã chạy qua service updateUser và cập nhật thông tin');
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    console.log('Đã chạy qua service DeleteUser và xóa User');
    return this.userRepository.delete({ id });
  }
  
  
}
