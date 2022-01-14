import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    // Check if item already exists
    const { name, image, price } = createItemDto;

    const qb = getRepository(Item)
      .createQueryBuilder('item')
      .where('item.name = :name', { name })
      .orWhere('item.image = :image', { image });

    const item = await qb.getOne();

    if (item) {
      throw this.respBadRequest(
        'This item already exists; name and image must be unique.',
      );
    }

    // Create item
    const newItem = new Item();
    newItem.name = name;
    newItem.image = image;
    newItem.price = price;

    const err = await validate(newItem);
    if (err.length > 0) {
      throw this.respBadRequest('Invalid input');
    } else {
      const savedItem = await this.itemRepository.save(newItem);
      return this.buildItemRO(savedItem);
    }
  }

  async findAll() {
    return await this.itemRepository.find();
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

  // TODO: Put this in a 'common' dir
  private respBadRequest(
    errDetail: string,
    errMessage = 'Input validation failed',
  ) {
    const error = { name: errDetail };
    return new HttpException(
      { message: errMessage, error },
      HttpStatus.BAD_REQUEST,
    );
  }

  private buildItemRO(item: Item) {
    const itemRO = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
    };

    return { item: itemRO };
  }
}
