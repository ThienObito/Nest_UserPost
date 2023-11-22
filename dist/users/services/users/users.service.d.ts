import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Post } from '../../../typeorm/entities/Post';
import { Profile } from '../../../typeorm/entities/Profile';
import { User } from '../../../typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from '../../../utils/types';
export declare class UsersService {
    private userRepository;
    private profileRepository;
    private postRepository;
    validateUser(username: string, password: string): void;
    login(user: any): void;
    constructor(userRepository: Repository<User>, profileRepository: Repository<Profile>, postRepository: Repository<Post>);
    findUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findOneByUsername(username: string): Promise<User | undefined>;
    updateUser(id: number, updateUserDetails: UpdateUserParams): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    createUserProfile(id: number, createUserProfileDetails: CreateUserProfileParams): Promise<User>;
    createUserPost(id: number, createUserPostDetails: CreateUserPostParams): Promise<Post>;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
