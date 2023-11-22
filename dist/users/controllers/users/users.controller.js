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
const CreateUserPost_dto_1 = require("../../dtos/CreateUserPost.dto");
const CreateUserProfile_dto_1 = require("../../dtos/CreateUserProfile.dto");
const UpdateUser_dto_1 = require("../../dtos/UpdateUser.dto");
const users_service_1 = require("../../services/users/users.service");
const bcrypt = require("bcrypt");
const Login_dto_1 = require("../../dtos/Login.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.findUsers();
    }
    async register(createUserDto) {
        const { username, password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        createUserDto.password = hashedPassword;
        const user = this.userService.createUser(createUserDto);
        return user;
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        try {
            const user = await this.authService.validateUser(username, password);
            const token = await this.authService.login(user);
            return Object.assign({ user }, token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Thông tin không hợp lệ');
        }
    }
    async updateUserById(id, updateUserDto) {
        await this.userService.updateUser(id, updateUserDto);
    }
    async deleteUserById(id) {
        await this.userService.deleteUser(id);
    }
    createUserProfile(id, createUserProfileDto) {
        return this.userService.createUserProfile(id, createUserProfileDto);
    }
    createUserPost(id, createUserPostDto) {
        return this.userService.createUserPost(id, createUserPostDto);
    }
};
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
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Post)(':id/profiles'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateUserProfile_dto_1.CreateUserProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUserProfile", null);
__decorate([
    (0, common_1.Post)(':id/posts'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateUserPost_dto_1.CreateUserPostDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUserPost", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map