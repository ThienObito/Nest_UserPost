import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
export declare class AuthService {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    login(username: string, password: string): Promise<string>;
    private validateUser;
}
