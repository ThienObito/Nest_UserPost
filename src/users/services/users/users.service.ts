import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/User';
import { UpdateUserParams } from '../../../utils/types';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';

@Injectable()
export class UsersService {
  async validateUser(phone: string, password: string): Promise<any> {
    try {
      let user = await this.userRepository.findOne({ where: { phone } });
      console.log('2323232', user, phone);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        console.log('User validated:', result);
        return result;
      }
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }

  async authenticateUser(userId: number, username: string): Promise<User> {
    try {
      // kiếm cái user
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new Error('Error authenticating user');
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      // Save the updated user to the database
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Error updating user');
    }
  }
  async findOneByPhone(phone: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { phone } });
      console.log('User found by phone:', user);
      return user;
    } catch (error) {
      console.error('Error in findOneByPhone:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private validatePassword(password: string, hashedPassword: string): boolean {
    // Thực hiện logic xác thực mật khẩu, có thể sử dụng bcrypt hoặc các phương thức khác
    // So sánh mật khẩu không được lưu trữ và mật khẩu đã hash
    // Trả về true nếu hợp lệ, ngược lại trả về false
    return password === hashedPassword;
  }

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async updateUserProfile(
    phone: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const { address, dob, sex } = updateProfileDto;
    let user = await this.userRepository.findOne({ where: { phone } });
    console.log(phone, address, sex);
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
    console.log('Đang băm mật khẩu...');
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

  deleteUser(id: number) {
    console.log('Đã chạy qua service DeleteUser và xóa User');
    return this.userRepository.delete({ id });
  }

  async logout(userId: number): Promise<void> {
    // Xóa thông tin phiên đăng nhập từ cơ sở dữ liệu
    await this.deleteSessionInfo(userId);
  }

  async deleteSessionInfo(userId: number): Promise<void> {
    // Xóa thông tin phiên đăng nhập từ cơ sở dữ liệu
  }

  async login(
    phone: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Xác thực và lấy thông tin người dùng
    const user = await this.validateUser(phone, password);

    // Tạo access token
    const accessToken = this.generateAccessToken(user);

    // Tạo refresh token
    const refreshToken = this.generateRefreshToken(user);

    // Lưu thông tin phiên đăng nhập vào cơ sở dữ liệu
    await this.saveSessionInfo(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  generateAccessToken(user: User): string {
    // Tạo access token với thông tin người dùng
    return jwt.sign(
      { userId: user.id, username: user.fullname },
      'your-secret-key',
      { expiresIn: '30m' },
    );
  }

  generateRefreshToken(user: User): string {
    // Tạo refresh token với thông tin người dùng
    return jwt.sign(
      { userId: user.id, username: user.fullname },
      'refresh-secret-key',
      { expiresIn: '30m' },
    );
  }

  async saveSessionInfo(userId: number, refreshToken: string): Promise<void> {
    // Lưu thông tin phiên đăng nhập vào cơ sở dữ liệu
  }

  async getUserFromToken() {}
}
