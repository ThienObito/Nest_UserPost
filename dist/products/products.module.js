"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_controller_1 = require("./controllers/products.controller");
const products_service_1 = require("./service/products.service");
const Products_1 = require("../typeorm/entities/Products");
const OrderDetails_1 = require("../typeorm/entities/OrderDetails");
const Orders_1 = require("../typeorm/entities/Orders");
const order_controller_1 = require("../order/controllers/order.controller");
const orderdetail_controller_1 = require("../order/controllers/orderdetail.controller");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Products_1.Product, OrderDetails_1.OrderDetail, Orders_1.Order]),
        ],
        controllers: [products_controller_1.ProductController, order_controller_1.OrderController, orderdetail_controller_1.OrderDetailController],
        providers: [products_service_1.ProductService, order_controller_1.OrderController, orderdetail_controller_1.OrderDetailController],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=products.module.js.map