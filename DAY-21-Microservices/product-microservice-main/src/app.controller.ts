import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateProductoDto } from './dto/create-product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ role: 'product', cmd: 'create'})
  async createProduct(@Payload() data: CreateProductoDto ) {
    return this.appService.createProduct(data);
  }

  @MessagePattern({ role: 'product', cmd: 'get-by-id'})
  getProductById(id: number) {
    return this.appService.getProductById(id);
  }
}
