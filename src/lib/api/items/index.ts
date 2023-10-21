import { ApiResponse } from '../types';
import { type ItemsData, type ItemsError, type Item } from './types';

export { type Item };

const ITEMS_URL =
  'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json';
export async function getItems(): Promise<ApiResponse<ItemsData, ItemsError>> {
  try {
    const response = await fetch(ITEMS_URL);
    if (!response.ok) throw new Error();
    const json = await response.json();
    return { data: { items: json.items }, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: 'An error occurred during data fetching',
      },
    };
  }
}
