import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';
export declare class UsersService {
    private userRepository;
    validateUser(phone: string, password: string): Promise<any>;
    authenticateUser(userId: number, username: string): Promise<User>;
    updateUser(user: User): Promise<User>;
    findOneByPhone(phone: string): Promise<User | undefined>;
    private validatePassword;
    constructor(userRepository: Repository<User>);
    updateUserProfile(phone: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUsers(): Promise<User[]>;
    findOneByUsername(fullname: string): Promise<User | undefined>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    logout(userId: number): Promise<void>;
    deleteSessionInfo(userId: number): Promise<void>;
    login(phone: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateAccessToken(user: User): string;
    generateRefreshToken(user: User): string;
    saveSessionInfo(userId: number, refreshToken: string): Promise<void>;
    getUserFromToken(): Promise<void>;
}
