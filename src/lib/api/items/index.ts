import { ApiResponse } from '../types';
import { filterItemsByKeyWords } from './helpers';
import { type ItemsData, type ItemsError, type Item } from './types';

export { type Item };

const ITEMS_URL =
  'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json';

export interface GetItemsParams {
  keyWords?: string;
}
export async function getItems({
  keyWords,
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
    const itemsFiltered = filterItemsByKeyWords(json.items, keyWords);

    return { data: { items: itemsFiltered }, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: 'An error occurred during data fetching',
      },
    };
  }
}
