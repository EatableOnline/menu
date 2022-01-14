import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private connection: Connection) {}

  async create(createItemDto: CreateItemDto) {
    return await this.connection.transaction(async (manager) => {
      return await manager.save(plainToClass(Item, createItemDto));
    });
  }

  async findAll() {
    return await this.connection.transaction(async (manager) => {
      return await manager.query('select * from item;');
    });
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
