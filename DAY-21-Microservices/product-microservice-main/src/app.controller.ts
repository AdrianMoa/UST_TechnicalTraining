import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateProductoDto } from './dto/product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ role: 'product', cmd: 'create'})
  async createProduct(productDto: Partial<CreateProductoDto>) {
    console.log('Microservice controller: create');
    console.log(productDto);
    console.log('DTO');
    const createData = await this.appService.createProduct(productDto);
    if(createData) {
      return createData.id;
    } else {
      return {
        status: 500,
        message: 'Something went wrong!'
      }
    }
  }

  @MessagePattern({ role: 'product', cmd: 'get-by-id'})
  getProductById(id: number) {
    console.log('Microservice controller: getById')
    return this.appService.getProductById(id);
  }
}
