import { Test, TestingModule } from '@nestjs/testing';

import { itemStub, updateItemStub } from './__mocks__/items.stub';
import { ItemsService } from './items.service';

jest.mock('./items.service');

const item = itemStub();
const itemDto = {
  name: 'Cheese Burger',
  image: 'https://image-server.com/cheese-burger.png',
  price: '49.99',
};

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new item', async () => {
    expect(await service.create(itemDto)).toStrictEqual(item);
  });

  it('should return all items', async () => {
    expect(await service.findAll()).toStrictEqual([item]);
  });

  it('should return an item', async () => {
    expect(await service.findOne(1)).toStrictEqual(item);
  });

  it('should update an item', async () => {
    const updatedItem = itemDto;
    updatedItem.price = '48.99';
    expect(await service.update(1, updatedItem)).toStrictEqual(
      updateItemStub(),
    );
  });

  it('should remove an item', async () => {
    expect(await service.remove(1)).toStrictEqual({});
  });
});
