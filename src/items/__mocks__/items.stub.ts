import { Item } from 'src/items/entities/item.entity';

export const itemStub = (): Item => {
  return {
    id: 1,
    name: 'Cheese Burger',
    image: 'https://image-server.com/cheese-burger.png',
    price: '49.99',
  };
};

export const updateItemStub = (): Item => {
  return {
    id: 1,
    name: 'Cheese Burger',
    image: 'https://image-server.com/cheese-burger.png',
    price: '48.99',
  };
};

export const deleteItemStub = () => {
  return {};
};
