import { Body, Controller, Post } from '@nestjs/common';

import { DeliverOrderDto, PickupOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async order(@Body() orderDto: DeliverOrderDto | PickupOrderDto) {
    return await this.ordersService.order(orderDto);
  }
}
