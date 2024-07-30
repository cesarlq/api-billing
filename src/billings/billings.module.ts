import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { BillingsController } from './billings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingInfoSchema, BillingDatas } from './schema/billing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BillingDatas.name,
        schema: BillingInfoSchema,
      },
    ]),
  ],
  controllers: [BillingsController],
  providers: [BillingsService],
})
export class BillingsModule {}
