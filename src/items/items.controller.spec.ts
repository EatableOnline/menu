import { Test, TestingModule } from '@nestjs/testing';
import { Item } from './entities/item.entity';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { itemStub, updateItemStub } from './__mocks__/items.stub';

jest.mock('./items.service');

const item = itemStub();
const itemDto = {
  name: 'Cheese Burger',
  image: 'https://image-server.com/cheese-burger.png',
  price: '49.99',
};

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let newItem: { Item: object };

      beforeEach(async () => {
        newItem = await controller.create(itemDto);
      });

      test('then it should call the create service', () => {
        expect(service.create).toBeCalledWith(itemDto);
      });

      test('then it should return a new item', () => {
        expect(newItem).toStrictEqual(item);
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let response: Item[];

      beforeEach(async () => {
        response = await controller.findAll();
      });

      test('then it should call the findAll service', () => {
        expect(service.findAll).toBeCalled();
      });

      test('then it should return all items', () => {
        expect(response).toStrictEqual([item]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let response: { Item: object };

      beforeEach(async () => {
        response = await controller.findOne('1');
      });

      test('then it should call the findOne service', () => {
        expect(service.findOne).toBeCalledWith(1);
      });

      test('then it should return one item', () => {
        expect(response).toStrictEqual(item);
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let response: { Item: object };

      const updatedItem = itemDto;
      updatedItem.price = '48.99';

      beforeEach(async () => {
        response = await controller.update(String(item.id), updatedItem);
      });

      test('then it should call the update service', () => {
        expect(service.update).toBeCalledWith(item.id, updatedItem);
      });

      test('then it should update and return one item', () => {
        expect(response).toStrictEqual(updateItemStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      let response: void;

      beforeEach(async () => {
        response = await controller.remove('1');
      });

      test('then it should call the remove service', () => {
        expect(service.remove).toBeCalledWith(1);
      });

      test('then it should return an empty body', () => {
        expect(response).toStrictEqual(undefined);
      });
    });
  });
});
