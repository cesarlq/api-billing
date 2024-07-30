import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingsModule } from './billings/billings.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://cesarlopez:rfNHRmNZnM8Ut9rO@billigtest.jkgbdnq.mongodb.net/Billing',
    ),
    BillingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
