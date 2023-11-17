import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../typeorm/entities/Post';
import { Profile } from '../../../typeorm/entities/Profile';
import { User } from '../../../typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from '../../../utils/types';
import { Console } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findUsers() {
    console.log("Đã chạy qua service findUsers tìm kiếm tất cả user bao gồm thông tin bài viết");
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    console.log("Đã chạy qua service createUser");
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    console.log("Đã chạy qua service updateUser và cập nhật thông tin");
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    console.log("Đã chạy qua service DeleteUser và xóa User");
    return this.userRepository.delete({ id });
  }
  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'Không tìm thấy user. Không thể tạo trang cá nhân',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    console.log("Đã chạy qua service createUserProfile và tạo thông tin");
    return this.userRepository.save(user);
  }

  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'Không tìm thấy User. Không thể tạo Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    console.log("Đã chạy qua service CreateUserPost tạo thành công bài viết");
    return this.postRepository.save(newPost);
  }
}
