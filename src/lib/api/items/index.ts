import { ApiResponse } from '../types';
import { filterItemsByKeyWords } from './helpers/filters';
import { orderItemsBy } from './helpers/orderBy';
import { getPaginatedItems } from './helpers/pagination';
import {
  type Item,
  type ItemsData,
  type ItemsError,
  type KeyWords,
  type OrderBy,
} from './types';

const ITEMS_URL =
  'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json';

export interface GetItemsParams {
  page?: number;
  keyWords?: KeyWords;
  orderBy?: OrderBy;
}
export async function getItems({
  page = 0,
  keyWords,
  orderBy,
}: GetItemsParams): Promise<ApiResponse<ItemsData, ItemsError>> {
  /*
    I'm assuming that the items.json is just a data sample, not an actual API.
    Because of this, I put all the search, pagination and data sorting logic in
    the getItems, since it is logic that would be assumed by the real API and
    not the frontend.
  */
  try {
    const response = await fetch(ITEMS_URL);
    if (!response.ok) throw new Error();

    const json = await response.json();
    const items = json.items as Item[];
    const itemsFiltered = filterItemsByKeyWords(items, keyWords);
    const itemsOrdered = orderItemsBy(itemsFiltered, orderBy);
    const { items: pageItems, pagination } = getPaginatedItems(
      itemsOrdered,
      page
    );

    return {
      data: {
        items: pageItems,
        meta: {
          keyWords,
          orderBy,
          pagination,
        },
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: 'An error occurred during data fetching',
      },
    };
  }
}
