import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { LoginDto } from 'src/users/dtos/Login.dto';
import * as jwt from 'jsonwebtoken';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/typeorm/entities/User';

interface Token {
  accessToken: string;
  expiresAt: Date;
}

@Controller('users')
export class UsersController {
  authService: any;
  constructor(private userService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req,
    @Headers() headers,
  ) {
    try {
      console.log('Bắt đầu quá trình cập nhật user...');

      const token = headers.authorization.replace('Bearer ', '');

      // Giải mã token để lấy thông tin người dùng
      const decodedToken = jwt.verify(token, 'your-secret-key') as JwtPayload;

      if (
        !decodedToken ||
        typeof decodedToken !== 'object' ||
        !('userId' in decodedToken) ||
        !('username' in decodedToken)
      ) {
        throw new Error('Invalid token format');
      }

      // Lấy thông tin từ token
      const userId = decodedToken.userId;
      const username = decodedToken.username;

      console.log('Đã lấy được id và tên của user', userId, username);

      // Gọi phương thức xác thực và cập nhật thông tin người dùng
      const updatedUser = await this.authenticateAndUpdate(
        userId,
        username,
        updateProfileDto,
      );

      console.log('Thông tin đã được cập nhật:', updatedUser);

      // Trả về thông tin đã được cập nhật cho client
      return { message: 'cập nhật người dùng', user: updatedUser };
    } catch (error) {
      console.error('token ivalid', error);
      // Xử lý lỗi khi giải mã token không thành công hoặc các lỗi khác
      return { message: 'token ivalid' };
    }
  }

  async authenticateAndUpdate(
    userId: number,
    username: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    try {
      // Gọi phương thức xác thực người dùng
      const authenticatedUser = await this.userService.authenticateUser(
        userId,
        username,
      );

      if (!authenticatedUser) {
        throw new UnauthorizedException('lỗi user auth');
      }

      // Cập nhật thông tin người dùng
      authenticatedUser.address = updateProfileDto.address;
      authenticatedUser.dob = new Date(updateProfileDto.dob);
      authenticatedUser.sex = updateProfileDto.sex;

      // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
      console.log('add thành công nha em iu');
      return await this.userService.updateUser(authenticatedUser);
    } catch (error) {
      throw new Error('lỗi auth và cập nhật user');
    }
  }

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu

    console.log('Bắt đầu quá trình đăng kí tài khoản...');

    // Cập nhật thuộc tính password của DTO với mật khẩu đã băm

    console.log('Tạo tài khoản thành công và lưu vào SQL...');
    // Tạo đối tượng user
    const user = this.userService.createUser(createUserDto);

    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: Token }> {
    try {
      const { phone, password } = loginDto;
      console.log('Bắt đầu quá trình đăng nhập...');
      const user = await this.userService.validateUser(phone, password);
      // Gọi phương thức validateUser để kiểm tra thông tin đăng nhập
      console.log('heloooooo', phone, password);
      // Kiểm tra xem user có giá trị không
      if (!user) {
        console.log(
          'Đăng nhập không thành công. Người dùng không tồn tại hoặc mật khẩu không đúng.',
        );
        throw new UnauthorizedException('Thông tin không hợp lệ');
      }

      console.log('Đăng nhập thành công. Tạo token...');

      // Generate a token with user information
      const token: Token = {
        accessToken: jwt.sign(
          { userId: user.id, username: user.fullname },
          'your-secret-key', // Thay thế bằng khóa bí mật của bạn
          { expiresIn: '10m' },
        ),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes in milliseconds
      };

      console.log('Token đã được tạo:', token);

      // Trả về chỉ đối tượng token cho client
      return {
        token,
      };
    } catch (error) {
      console.error('Lỗi trong quá trình đăng nhập:', error);
      // Nếu có lỗi, ném ra ngoại lệ UnauthorizedException với thông báo tương ứng
      throw new UnauthorizedException('Thông tin không hợp lệ');
    }
  }
}