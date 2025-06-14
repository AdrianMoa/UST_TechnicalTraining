import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/product/:id')
  getById(@Param('id') id: number) {
    return this.appService.getProductById(id);
  }

  @Post('/create')
  create(@Body() body: { name: string }) {
    return this.appService.createProduct(body.name);
  }
}
