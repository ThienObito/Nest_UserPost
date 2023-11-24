import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from 'src/auth/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: any;
    }>;
}
