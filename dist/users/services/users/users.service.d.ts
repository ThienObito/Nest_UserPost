import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/User';
import { UpdateUserParams } from '../../../utils/types';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';
export declare class UsersService {
    private userRepository;
    validateUser(fullname: string, password: string): User | null;
    login(user: any): void;
    constructor(userRepository: Repository<User>);
    updateUserProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUsers(): Promise<User[]>;
    findOneByUsername(fullname: string): Promise<User | undefined>;
    updateUser(id: number, updateUserDetails: UpdateUserParams): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
