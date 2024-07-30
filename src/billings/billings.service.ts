import { Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BillingDatas, BillingDocument } from './schema/billing.schema';
import { Model } from 'mongoose';

@Injectable()
export class BillingsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(BillingDatas.name)
    private BillingModule: Model<BillingDocument>,
  ) {}
  async create(createBillingDto: CreateBillingDto) {
    const createBilling = await this.BillingModule.create(createBillingDto);
    const response = {
      message: 'Billing created successfully',
      data: createBilling,
    };
    return response;
  }

  findAll() {
    const allBillings = this.BillingModule.find();
    return allBillings;
  }

  findOne(id: string) {
    const findBilling = this.BillingModule.findById(id);
    return findBilling;
  }

  update(id: number, updateBillingDto: UpdateBillingDto) {
    return `This action updates a #${id} billing`;
  }

  remove(id: string) {
    const removeBilling = this.BillingModule.findByIdAndDelete(id);
    return removeBilling;
  }
}
