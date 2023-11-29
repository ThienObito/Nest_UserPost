import { ProductService } from '../service/products.service';
import { Product } from 'src/typeorm/entities/Products';
import { CreateProductDto } from '../dtos/CreateProduct.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<Product[]>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: number, updateProductDto: CreateProductDto): Promise<Product>;
    delete(id: number): Promise<void>;
    findOne(id: number): Promise<Product>;
}
