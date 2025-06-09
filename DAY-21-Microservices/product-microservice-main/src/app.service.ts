import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  createProduct(product: Partial<ProductEntity> ) {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  getProductById(id: number) {
    return this.productRepository.findOneBy({ id });
  }
}
