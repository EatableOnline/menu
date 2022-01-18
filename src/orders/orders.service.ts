import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { DeliverOrderDto, PickupOrderDto } from './dto/create-order.dto';
import { OrderEvent } from './orders.events';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MANAGER') private readonly orderManagerClient: ClientProxy,
  ) {}

  async order(orderDto: DeliverOrderDto | PickupOrderDto) {
    this.orderManagerClient.emit('order_placed', new OrderEvent(orderDto));
  }
}
