import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
@Controller('eth')
export class EthController {
  constructor(private readonly appService: AppService) {}
  @Post()
  getEth(@Req() request: Request): any {
    return this.appService.getEth(request);
  }
}
