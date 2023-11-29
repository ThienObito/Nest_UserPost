import { Product } from 'src/typeorm/entities/Products';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/CreateProduct.dto';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: number, UpdateProductDto: CreateProductDto): Promise<Product>;
    delete(id: number): Promise<void>;
    findOne(id: number): Promise<Product | undefined>;
}
