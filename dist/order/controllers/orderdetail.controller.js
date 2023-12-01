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
exports.OrderDetailController = void 0;
const common_1 = require("@nestjs/common");
const oderdetail_service_1 = require("../services/oderdetail.service");
const CreateOrder_dto_1 = require("../dtos/CreateOrder.dto");
let OrderDetailController = class OrderDetailController {
    constructor(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    async findAll() {
        console.log('tìm kiếm tất cả thông tin Order');
        return this.orderDetailService.findAll();
    }
    async getOrderDetailById(id) {
        return this.orderDetailService.findOne(id);
    }
    async createOrderDetail(createOrderDto) {
        return this.orderDetailService.create(createOrderDto);
    }
    async updateOrderDetail(id, updateOrderDto) {
        return this.orderDetailService.update(id, updateOrderDto);
    }
    async deleteOrderDetail(id) {
        return this.orderDetailService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getOrderDetailById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrder_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "createOrderDetail", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateOrder_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "updateOrderDetail", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "deleteOrderDetail", null);
OrderDetailController = __decorate([
    (0, common_1.Controller)('order-details'),
    __metadata("design:paramtypes", [oderdetail_service_1.OrderDetailService])
], OrderDetailController);
exports.OrderDetailController = OrderDetailController;
//# sourceMappingURL=orderdetail.controller.js.map