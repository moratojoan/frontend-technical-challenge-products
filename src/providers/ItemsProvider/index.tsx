'use client';

import { GetItemsParams, getItems } from '@/lib/api/items';
import { ItemsData, ItemsError } from '@/lib/api/items/types';
import { ApiResponse } from '@/lib/api/types';
import { ReactNode, createContext, useContext, useState } from 'react';

type FetchItemsParams = GetItemsParams;
interface ItemsProviderValue {
  itemsResponse: ApiResponse<ItemsData, ItemsError>;
  fetchItems: (params: FetchItemsParams) => void;
}
const defaultValue: ItemsProviderValue = {
  itemsResponse: {
    data: {
      items: [],
      meta: {
        pagination: {
          page: 0,
          total: 0,
          perPage: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    },
    error: null,
  },
  fetchItems: () => {},
};
const ItemsContext = createContext(defaultValue);

interface ItemsProviderProps {
  children: ReactNode;
  initialItemsResponse: ApiResponse<ItemsData, ItemsError>;
}
export function ItemsProvider({
  children,
  initialItemsResponse,
}: ItemsProviderProps) {
  const [itemsResponse, setItemsResponse] = useState(initialItemsResponse);

  const fetchItems = async (params: FetchItemsParams) => {
    const actualMeta = itemsResponse?.data?.meta ?? {};
    const newItemsResponse = await getItems({ ...actualMeta, ...params });
    setItemsResponse(newItemsResponse);
  };
  return (
    <ItemsContext.Provider
      value={{
        itemsResponse,
        fetchItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
export function useItems() {
  return useContext(ItemsContext);
}
