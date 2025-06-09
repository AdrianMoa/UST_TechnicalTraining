import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('PRODUCT_MICROSERVICE') private readonly client: ClientProxy
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createProduct(name: string) {
    return this.client.send({ role: 'product', cmd: 'create' }, { name });
  }

  getProductById(id: number) {
    return this.client.send({ role: 'product', cmd: 'get-by-id' }, id);
  }
}
