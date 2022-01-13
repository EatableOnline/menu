import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private connection: Connection) {}

  async create(createItemDto: CreateItemDto) {
    return `This action adds a new item: ${createItemDto}`;
  }

  async findAll() {
    return `This action returns all items`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
