import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillingDocument = BillingDatas & Document;

@Schema()
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: false, type: Number })
  zip: number | null;

  @Prop({ required: true })
  suburb: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class BillingDatas {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false, type: Number })
  phone: number | null;

  @Prop({ type: AddressSchema, required: true })
  Address: Address;
}

export const BillingInfoSchema = SchemaFactory.createForClass(BillingDatas);
