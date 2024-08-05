import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty({ required: true })
  street: string;

  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: true })
  state: string;

  @ApiProperty({ required: false, type: Number })
  zip: number | null;

  @ApiProperty({ required: true })
  suburb: string;
}

export class CreateBillingDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: false, type: Number })
  phone: number | null;

  @ApiProperty({ type: Address, required: true })
  Address: Address;
}
