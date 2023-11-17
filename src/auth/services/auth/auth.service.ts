import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.validateUser(username, password);

    if (user) {
      const payload = { username: user.username, sub: user.id };
      return this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async validateUser(username: string, password: string): Promise<User | null> {
     return await this.userRepository.findOne({
       where: { username, password },
     });
   }
   
}
