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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const Post_1 = require("../../../typeorm/entities/Post");
const Profile_1 = require("../../../typeorm/entities/Profile");
const User_1 = require("../../../typeorm/entities/User");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    validateUser(username, password) {
        throw new Error('Method not implemented.');
    }
    login(user) {
        throw new Error('Method not implemented.');
    }
    constructor(userRepository, profileRepository, postRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.postRepository = postRepository;
    }
    findUsers() {
        console.log('Đã chạy qua service findUsers tìm kiếm tất cả user');
        return this.userRepository.find({ relations: ['profile', 'posts'] });
    }
    async createUser(createUserDto) {
        const newUser = this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { createdAt: new Date() }));
        console.log('Đã chạy qua service createUser và băm mật khẩu');
        return this.userRepository.save(newUser);
    }
    async findOneByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    updateUser(id, updateUserDetails) {
        console.log('Đã chạy qua service updateUser và cập nhật thông tin');
        return this.userRepository.update({ id }, Object.assign({}, updateUserDetails));
    }
    deleteUser(id) {
        console.log('Đã chạy qua service DeleteUser và xóa User');
        return this.userRepository.delete({ id });
    }
    async createUserProfile(id, createUserProfileDetails) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException('Không tìm thấy user. Không thể tạo trang cá nhân', common_1.HttpStatus.BAD_REQUEST);
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        console.log('Đã chạy qua service createUserProfile và tạo thông tin');
        return this.userRepository.save(user);
    }
    async createUserPost(id, createUserPostDetails) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException('Không tìm thấy User. Không thể tạo Profile', common_1.HttpStatus.BAD_REQUEST);
        const newPost = this.postRepository.create(Object.assign(Object.assign({}, createUserPostDetails), { user }));
        console.log('Đã chạy qua service CreateUserPost tạo thành công bài viết');
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
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.usersService.findOneByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async login(user) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=users.service.js.map