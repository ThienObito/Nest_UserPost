import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key', 
    });
  }

  async validate(payload: any): Promise<any> {
    const { userId, phone } = payload;

    if (JwtStrategy.isAccessTokenExpired(payload)) {
      const newAccessToken = this.generateAccessToken({ userId, phone });

      return { userId, phone, accessToken: newAccessToken };
    }

    return { userId, phone };
  }

  static isAccessTokenExpired(payload: any): boolean {
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  }

  generateAccessToken(user: any): string {
    return sign({ userId: user.userId, phone: user.phone }, 'your-secret-key', { expiresIn: '3m' });
  }
}
