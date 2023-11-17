import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string): Promise<{ access_token: string }> {
    try {
      const token = await this.authService.login(username, password);
      return { access_token: token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
