import { Module } from '@nestjs/common';
import { AppController, EthController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, EthController],
  providers: [AppService],
})
export class AppModule {}
