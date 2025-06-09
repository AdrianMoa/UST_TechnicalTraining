import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/product.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createProduct(productEntity: Partial<ProductEntity>) {
    
    console.log('DTO on SERVICE*****************');
    console.log(productEntity);
    // const product = new ProductEntity();
    // product.name = productDto.name ?? '';
    const newProduct = this.productRepository.create(productEntity);
    console.log('-------********NEW PRODUCT*******---------');
    console.log(newProduct);
    return this.productRepository.save(newProduct);
  }

  getProductById(id: number) {
    return this.productRepository.findOneBy({ id });
  }
}
