import { IsBoolean, IsString } from 'class-validator';

class Order {
  @IsString({ each: true })
  readonly items: string[];
}

export class DeliverOrderDto extends Order {
  @IsString()
  readonly customerAddress: string;

  @IsBoolean()
  readonly deliverNow: boolean;
}

export class PickupOrderDto extends Order {
  @IsString()
  readonly branch: string;
}
