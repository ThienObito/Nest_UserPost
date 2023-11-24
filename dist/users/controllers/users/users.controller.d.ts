import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { LoginDto } from 'src/users/dtos/Login.dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';
interface Token {
    accessToken: string;
    expiresAt: Date;
}
export declare class UsersController {
    private userService;
    authService: any;
    constructor(userService: UsersService);
    updateProfile(updateProfileDto: UpdateProfileDto, req: any): Promise<import("../../../typeorm/entities/User").User | {
        message: string;
    }>;
    getUsers(): Promise<import("../../../typeorm/entities/User").User[]>;
    register(createUserDto: CreateUserDto): Promise<import("../../../typeorm/entities/User").User>;
    login(loginDto: LoginDto): Promise<{
        token: Token;
    }>;
}
export {};
