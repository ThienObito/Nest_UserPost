import { Repository } from 'typeorm';
import { Post } from '../../../typeorm/entities/Post';
import { Profile } from '../../../typeorm/entities/Profile';
import { User } from '../../../typeorm/entities/User';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from '../../../utils/types';
export declare class UsersService {
    private userRepository;
    private profileRepository;
    private postRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<Profile>, postRepository: Repository<Post>);
    findUsers(): Promise<User[]>;
    createUser(userDetails: CreateUserParams): Promise<User>;
    updateUser(id: number, updateUserDetails: UpdateUserParams): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    createUserProfile(id: number, createUserProfileDetails: CreateUserProfileParams): Promise<User>;
    createUserPost(id: number, createUserPostDetails: CreateUserPostParams): Promise<Post>;
}
