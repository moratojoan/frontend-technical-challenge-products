import { type Order, type OrderBy, type Iterator } from '@/lib/api/items/types';

const INITIAL_ORDER: Order = 'asc';
const ORDER_BY_SEPARATOR = '_';

export function splitOrderBy(orderBy: OrderBy) {
  return orderBy.split(ORDER_BY_SEPARATOR) as [Iterator, Order];
}
export function joinOrderBy(iterator: Iterator, order: Order) {
  return [iterator, order].join(ORDER_BY_SEPARATOR) as OrderBy;
}
export function toggleOrder(order: Order) {
  return order === 'asc' ? 'desc' : 'asc';
}

export function getNewOrderBy(
  {
    actualIterator,
    actualOrder,
  }: { actualIterator?: Iterator; actualOrder?: Order },
  { newIterator }: { newIterator?: Iterator }
): OrderBy | undefined {
  if (!newIterator) return undefined;
  if (actualIterator !== newIterator) {
    return joinOrderBy(newIterator, INITIAL_ORDER);
  }
  const newOrder = actualOrder ? toggleOrder(actualOrder) : INITIAL_ORDER;
  return joinOrderBy(newIterator, newOrder);
}
