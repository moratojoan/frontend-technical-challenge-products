import lodashOrderBy from 'lodash.orderby';
import { type Item, type Iterator, type OrderBy } from '../types';
import { splitOrderBy } from '@/lib/helpers/order';

const getIterator = (iterator: Iterator) => {
  return iterator === 'price'
    ? getNumberIterator(iterator)
    : getStringIterator(iterator);
};
const getNumberIterator = (iterator: Iterator) => (item: Item) =>
  Number(item[iterator]);
const getStringIterator = (iterator: Iterator) => (item: Item) =>
  item[iterator].toLowerCase();

export function orderItemsBy(items: Item[], orderBy?: OrderBy) {
  if (!orderBy) return items;
  const [iterator, order] = splitOrderBy(orderBy);
  const itemsOrdered = lodashOrderBy(items, [getIterator(iterator)], order);
  return itemsOrdered;
}
