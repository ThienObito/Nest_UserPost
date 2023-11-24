import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import {  UsersService } from '../../services/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/users/dtos/Login.dto';  
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from 'src/typeorm/entities/jwt.auth.guard';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';


interface Token {
  accessToken: string;
  expiresAt: Date;
}
interface UpdateUserParams {
  address:string;
  dob:Date;
  sex:boolean;
}

@Controller('users')
export class UsersController {
  authService: any;
  constructor(private userService: UsersService) {}

@UseGuards(JwtAuthGuard)
@Put()
async updateProfile(@Body() updateProfileDto: UpdateProfileDto, @Req() req) {
  console.log("Bắt đầu quá trình cập nhật user...");
  const userIdFromToken = req.user.id;
  console.log("Lấy token Authentical");
  if (userIdFromToken !== updateProfileDto.id) {
    console.log("Ôi chức năng update bị lỗi");
    return { message: 'Unauthorized update attempt' };
  }
  console.log("Cập nhật thành công vào SQL");
  return this.userService.updateUserProfile(userIdFromToken, updateProfileDto);
}

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post('register')
 async register(@Body() createUserDto: CreateUserDto) {
    const { fullname, phone,
      password } = createUserDto;
      console.log("Bắt đầu quá trình đăng kí tài khoản...");
    // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Đang băm mật khẩu...");
    // Cập nhật thuộc tính password của DTO với mật khẩu đã băm
    createUserDto.password = hashedPassword;
    console.log("Tạo tài khoản thành công và lưu vào SQL...");
    // Tạo đối tượng user
    const user = this.userService.createUser(createUserDto);

    return user;
}



@Post('login')
async login(@Body() loginDto: LoginDto): Promise<{ token: Token; }> {
  const { username, password } = loginDto;

  try {
    console.log("Bắt đầu quá trình đăng nhập...");

    // Gọi phương thức validateUser để kiểm tra thông tin đăng nhập
    const user = await this.userService.validateUser(username, password);

    console.log("Đăng nhập thành công. Tạo token...");

    // Generate a token with user information
    const token: Token = {
      accessToken: jwt.sign({ userId: user.id, username: user.fullname }, 'your-secret-key', {
        expiresIn: '1h',
      }),
      expiresAt: new Date(),
    };

    console.log("Token đã được tạo:", token);

    // Trả về chỉ đối tượng token cho client
    return {
      token,
    };
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error);
    // Nếu có lỗi, ném ra ngoại lệ UnauthorizedException với thông báo tương ứng
    throw new UnauthorizedException('Thông tin không hợp lệ');
  }
}
 


}




