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
exports.OrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const OrderDetails_1 = require("../../typeorm/entities/OrderDetails");
let OrderDetailService = class OrderDetailService {
    constructor(orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }
    async findAll() {
        return this.orderDetailRepository.find();
    }
    async create(createOrderDto) {
        const orderDetail = this.orderDetailRepository.create(createOrderDto);
        return await this.orderDetailRepository.save(orderDetail);
    }
    async delete(id) {
        await this.orderDetailRepository.delete(id);
    }
    async getOrderDetailById(id) {
        console.log('Requested id:', id);
        const conditions = { where: { id } };
        const orderDetail = await this.orderDetailRepository.findOne(conditions);
        console.log('Found orderDetail:', orderDetail);
        if (!orderDetail) {
            throw new common_1.NotFoundException(`Order detail with id ${id} not found`);
        }
        return orderDetail;
    }
    async findOne(id) {
        return this.orderDetailRepository.findOne({
            where: { id },
        });
    }
    async update(id, updateOrderDto) {
        await this.orderDetailRepository.update(id, updateOrderDto);
        return this.orderDetailRepository.findOne({
            where: { id },
        });
    }
};
OrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(OrderDetails_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderDetailService);
exports.OrderDetailService = OrderDetailService;
//# sourceMappingURL=oderdetail.service.js.map