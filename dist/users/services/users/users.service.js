"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Post_1 = require("../../../typeorm/entities/Post");
const Profile_1 = require("../../../typeorm/entities/Profile");
const User_1 = require("../../../typeorm/entities/User");
let UsersService = class UsersService {
    constructor(userRepository, profileRepository, postRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.postRepository = postRepository;
    }
    findUsers() {
        console.log("Đã chạy qua service findUsers tìm kiếm tất cả user bao gồm thông tin bài viết");
        return this.userRepository.find({ relations: ['profile', 'posts'] });
    }
    createUser(userDetails) {
        const newUser = this.userRepository.create(Object.assign(Object.assign({}, userDetails), { createdAt: new Date() }));
        console.log("Đã chạy qua service createUser");
        return this.userRepository.save(newUser);
    }
    updateUser(id, updateUserDetails) {
        console.log("Đã chạy qua service updateUser và cập nhật thông tin");
        return this.userRepository.update({ id }, Object.assign({}, updateUserDetails));
    }
    deleteUser(id) {
        console.log("Đã chạy qua service DeleteUser và xóa User");
        return this.userRepository.delete({ id });
    }
    async createUserProfile(id, createUserProfileDetails) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException('Không tìm thấy user. Không thể tạo trang cá nhân', common_1.HttpStatus.BAD_REQUEST);
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        console.log("Đã chạy qua service createUserProfile và tạo thông tin");
        return this.userRepository.save(user);
    }
    async createUserPost(id, createUserPostDetails) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException('Không tìm thấy User. Không thể tạo Profile', common_1.HttpStatus.BAD_REQUEST);
        const newPost = this.postRepository.create(Object.assign(Object.assign({}, createUserPostDetails), { user }));
        console.log("Đã chạy qua service CreateUserPost tạo thành công bài viết");
        return this.postRepository.save(newPost);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Profile_1.Profile)),
    __param(2, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map