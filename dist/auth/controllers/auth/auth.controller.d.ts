import { AuthService } from 'src/auth/services/auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
