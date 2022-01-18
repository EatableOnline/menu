interface Order {
  item: string;
}

export class DeliverOrderDto implements Order {
  readonly item: string;
  readonly customerAddress: string;
  readonly deliverNow: boolean;
}

export class PickupOrderDto implements Order {
  readonly item: string;
  readonly branch: string;
}
