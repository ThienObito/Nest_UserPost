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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_1 = require("../../../typeorm/entities/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let UsersService = class UsersService {
    async validateUser(phone, password) {
        try {
            let user = await this.userRepository.findOne({ where: { phone } });
            console.log('2323232', user, phone);
            if (user && (await bcrypt.compare(password, user.password))) {
                const { password } = user, result = __rest(user, ["password"]);
                console.log('User validated:', result);
                return result;
            }
        }
        catch (error) {
            console.error('Error validating user:', error);
            return null;
        }
    }
    async authenticateUser(userId, username) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            throw new Error('Error authenticating user');
        }
    }
    async updateUser(user) {
        try {
            return await this.userRepository.save(user);
        }
        catch (error) {
            throw new Error('Error updating user');
        }
    }
    async findOneByPhone(phone) {
        try {
            const user = await this.userRepository.findOne({ where: { phone } });
            console.log('User found by phone:', user);
            return user;
        }
        catch (error) {
            console.error('Error in findOneByPhone:', error);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
    validatePassword(password, hashedPassword) {
        return password === hashedPassword;
    }
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async updateUserProfile(phone, updateProfileDto) {
        const { address, dob, sex } = updateProfileDto;
        let user = await this.userRepository.findOne({ where: { phone } });
        console.log(phone, address, sex);
        if (!user) {
            throw new Error('User not found');
        }
        user.address = address;
        user.dob = dob;
        user.sex = sex;
        return this.userRepository.save(user);
    }
    async createUser(createUserDto) {
        const { fullname, phone, password } = createUserDto;
        console.log('Đang băm mật khẩu...');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            fullname,
            phone,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    }
    async findUsers() {
        return this.userRepository.find();
    }
    async findOneByUsername(fullname) {
        return this.userRepository.findOne({ where: { fullname } });
    }
    deleteUser(id) {
        console.log('Đã chạy qua service DeleteUser và xóa User');
        return this.userRepository.delete({ id });
    }
    async logout(userId) {
        await this.deleteSessionInfo(userId);
    }
    async deleteSessionInfo(userId) {
    }
    async login(phone, password) {
        const user = await this.validateUser(phone, password);
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await this.saveSessionInfo(user.id, refreshToken);
        return { accessToken, refreshToken };
    }
    generateAccessToken(user) {
        return jwt.sign({ userId: user.id, username: user.fullname }, 'your-secret-key', { expiresIn: '30m' });
    }
    generateRefreshToken(user) {
        return jwt.sign({ userId: user.id, username: user.fullname }, 'refresh-secret-key', { expiresIn: '30m' });
    }
    async saveSessionInfo(userId, refreshToken) {
    }
    async getUserFromToken() { }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map