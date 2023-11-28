import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { LoginDto } from 'src/users/dtos/Login.dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';
import { User } from 'src/typeorm/entities/User';
interface Token {
    accessToken: string;
    expiresAt: Date;
}
export declare class UsersController {
    private userService;
    authService: any;
    constructor(userService: UsersService);
    updateProfile(updateProfileDto: UpdateProfileDto, req: any, headers: any): Promise<{
        message: string;
        user: User;
    } | {
        message: string;
        user?: undefined;
    }>;
    authenticateAndUpdate(userId: number, username: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    getUsers(): Promise<User[]>;
    register(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        token: Token;
    }>;
}
export {};
