import { Item, Meta } from '../types';

const ITEMS_PER_PAGE = 5;
interface PaginatedItems {
  items: Item[];
  pagination: Meta['pagination'];
}
export function getPaginatedItems(
  items: Item[],
  page: Meta['pagination']['page']
): PaginatedItems {
  const total = items.length;
  const perPage = ITEMS_PER_PAGE;
  const hasPrevPage = page > 0;
  const nextPage = page + 1;
  const hasNextPage = (nextPage + 1) * perPage <= total;

  const pageItems = items.slice(page * perPage, nextPage * perPage);

  return {
    items: pageItems,
    pagination: {
      page,
      total,
      perPage,
      hasPrevPage,
      hasNextPage,
    },
  };
}
