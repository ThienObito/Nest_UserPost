import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { CreateUserPostDto } from '../../dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { LoginDto } from 'src/users/dtos/Login.dto';
export declare class UsersController {
    private userService;
    authService: any;
    constructor(userService: UsersService);
    getUsers(): Promise<import("../../../typeorm/entities/User").User[]>;
    register(createUserDto: CreateUserDto): Promise<import("../../../typeorm/entities/User").User>;
    login(loginDto: LoginDto): Promise<any>;
    updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<void>;
    deleteUserById(id: number): Promise<void>;
    createUserProfile(id: number, createUserProfileDto: CreateUserProfileDto): Promise<import("../../../typeorm/entities/User").User>;
    createUserPost(id: number, createUserPostDto: CreateUserPostDto): Promise<import("../../../typeorm/entities/Post").Post>;
}
