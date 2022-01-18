import { DeliverOrderDto, PickupOrderDto } from './dto/create-order.dto';

export class OrderEvent {
  constructor(public readonly order: DeliverOrderDto | PickupOrderDto) {}
}
