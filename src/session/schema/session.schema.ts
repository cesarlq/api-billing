import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = SessionDatas & Document;

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
export class SessionDatas {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: Address;
}

export const SessionInfoSchema = SchemaFactory.createForClass(SessionDatas);
