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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const CreateUser_dto_1 = require("../../dtos/CreateUser.dto");
const users_service_1 = require("../../services/users/users.service");
const Login_dto_1 = require("../../dtos/Login.dto");
const jwt = require("jsonwebtoken");
const UpdateProfileDto_1 = require("../../dtos/UpdateProfileDto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async updateProfile(updateProfileDto, req, headers) {
        try {
            console.log('Bắt đầu quá trình cập nhật user...');
            const token = headers.authorization.replace('Bearer ', '');
            const decodedToken = jwt.verify(token, 'your-secret-key');
            if (!decodedToken ||
                typeof decodedToken !== 'object' ||
                !('userId' in decodedToken) ||
                !('username' in decodedToken)) {
                throw new Error('Invalid token format');
            }
            const userId = decodedToken.userId;
            const username = decodedToken.username;
            console.log('Đã lấy được id và tên của user', userId, username);
            const updatedUser = await this.authenticateAndUpdate(userId, username, updateProfileDto);
            console.log('Thông tin đã được cập nhật:', updatedUser);
            return { message: 'cập nhật người dùng', user: updatedUser };
        }
        catch (error) {
            console.error('token ivalid', error);
            return { message: 'token ivalid' };
        }
    }
    async authenticateAndUpdate(userId, username, updateProfileDto) {
        try {
            const authenticatedUser = await this.userService.authenticateUser(userId, username);
            if (!authenticatedUser) {
                throw new common_1.UnauthorizedException('lỗi user auth');
            }
            authenticatedUser.address = updateProfileDto.address;
            authenticatedUser.dob = new Date(updateProfileDto.dob);
            authenticatedUser.sex = updateProfileDto.sex;
            console.log('add thành công nha em iu');
            return await this.userService.updateUser(authenticatedUser);
        }
        catch (error) {
            throw new Error('lỗi auth và cập nhật user');
        }
    }
    getUsers() {
        return this.userService.findUsers();
    }
    async register(createUserDto) {
        console.log('Bắt đầu quá trình đăng kí tài khoản...');
        console.log('Tạo tài khoản thành công và lưu vào SQL...');
        const user = this.userService.createUser(createUserDto);
        return user;
    }
    async login(loginDto) {
        try {
            const { phone, password } = loginDto;
            console.log('Bắt đầu quá trình đăng nhập...');
            const user = await this.userService.validateUser(phone, password);
            console.log('heloooooo', phone, password);
            if (!user) {
                console.log('Đăng nhập không thành công. Người dùng không tồn tại hoặc mật khẩu không đúng.');
                throw new common_1.UnauthorizedException('Thông tin không hợp lệ');
            }
            console.log('Đăng nhập thành công. Tạo token...');
            const token = {
                accessToken: jwt.sign({ userId: user.id, username: user.fullname }, 'your-secret-key', { expiresIn: '10m' }),
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            };
            console.log('Token đã được tạo:', token);
            return {
                token,
            };
        }
        catch (error) {
            console.error('Lỗi trong quá trình đăng nhập:', error);
            throw new common_1.UnauthorizedException('Thông tin không hợp lệ');
        }
    }
};
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProfileDto_1.UpdateProfileDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map