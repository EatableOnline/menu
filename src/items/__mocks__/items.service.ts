import { itemStub, deleteItemStub, updateItemStub } from './items.stub';

export const ItemsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(itemStub()),
  findAll: jest.fn().mockResolvedValue([itemStub()]),
  findOne: jest.fn().mockResolvedValue(itemStub()),
  update: jest.fn().mockResolvedValue(updateItemStub()),
  remove: jest.fn().mockResolvedValue(deleteItemStub()),
});
