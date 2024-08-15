import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingsModule } from './billings/billings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './session/session.controller';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://cesarlopez:rfNHRmNZnM8Ut9rO@billigtest.jkgbdnq.mongodb.net/Billing',
    ),
    MongooseModule.forRoot(
      'mongodb+srv://cesarlopez:rfNHRmNZnM8Ut9rO@billigtest.jkgbdnq.mongodb.net/session',
    ),
    BillingsModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
