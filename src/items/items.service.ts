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

    const qb = await getRepository(Item)
      .createQueryBuilder('item')
      .where('item.name = :name', { name })
      .orWhere('item.image = :image', { image });

    const item = await qb.getOne();

    if (item) {
      throw await this.respBadRequest(
        {
          name: 'This item already exists; name and image must be unique.',
        },
        undefined,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create item
    const newItem = new Item();
    newItem.name = name;
    newItem.image = image;
    newItem.price = price;

    const err = await validate(newItem);
    if (err.length > 0) {
      throw await this.respBadRequest(
        { name: 'Invalid input' },
        undefined,
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedItem = await this.itemRepository.save(newItem);
    return await this.buildItemRO(savedItem);
  }

  async findAll() {
    return await this.itemRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOne(id);

    if (!item) {
      throw await this.respBadRequest(
        { Item: 'Not found' },
        undefined,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.buildItemRO(item);
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const qb = await getRepository(Item)
      .createQueryBuilder('item')
      .where('id = :id', { id });

    const item = await qb.getOne();

    if (item === undefined) {
      throw await this.respBadRequest(
        { name: 'Invalid input' },
        undefined,
        HttpStatus.BAD_REQUEST,
      );
    }

    await qb.update().set(updateItemDto).execute();

    return await this.buildItemRO({ ...{ id: id }, ...updateItemDto });
  }

  async remove(id: number) {
    return await this.itemRepository.delete(id);
  }

  // TODO: Put this in a 'common' dir
  private async respBadRequest(
    errDetail: object,
    errMessage = 'Input validation failed',
    errCode: number,
  ) {
    return new HttpException({ message: errMessage, errDetail }, errCode);
  }

  private async buildItemRO(item: Item | object) {
    let itemRO: object;
    if (item instanceof Item) {
      itemRO = {
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
      };
    } else {
      itemRO = item;
    }

    return { Item: itemRO };
  }
}
