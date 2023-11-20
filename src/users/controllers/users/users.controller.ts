import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { CreateUserPostDto } from '../../dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import {  UsersService } from '../../services/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/users/dtos/Login.dto';  


@Controller('users')
export class UsersController {
  authService: any;
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post('register')
 async register(@Body() createUserDto: CreateUserDto) {
    const { username, 
      password } = createUserDto;
    // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);


    // Cập nhật thuộc tính password của DTO với mật khẩu đã băm
    createUserDto.password = hashedPassword;

    // Tạo đối tượng user
    const user = this.userService.createUser(createUserDto);

    return user;
}



  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    try {
      
      const user = await this.authService.validateUser(username, password);
      
      const token = await this.authService.login(user);
     
      return {
        user,
        ...token,
      };
    } catch (error) {
      throw new UnauthorizedException('Thông tin không hợp lệ');
    }
  }
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
}
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   async login(@Body() loginDto: LoginDto) {
//     const { username, password } = loginDto;
//     try {
//       const user = await this.authService.validateUser(username, password);
//       const token = await this.authService.login(user);
//       return {
//         user,
//         ...token,
//       };
//     } catch (error) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//   }
// }

