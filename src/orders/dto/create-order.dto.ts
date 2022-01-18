class Order {
  readonly item: string;
}

export class DeliverOrderDto extends Order {
  readonly customerAddress: string;
  readonly deliverNow: boolean;
}

export class PickupOrderDto extends Order {
  readonly branch: string;
}
