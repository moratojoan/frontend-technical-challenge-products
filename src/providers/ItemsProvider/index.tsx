'use client';

import { GetItemsParams, getItems } from '@/lib/api/items';
import { ItemsData, ItemsError, Meta } from '@/lib/api/items/types';
import { ApiResponse } from '@/lib/api/types';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ItemsProviderValue {
  itemsResponse: ApiResponse<ItemsData, ItemsError>;
  fetchItems: (params: GetItemsParams) => void;
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

  const fetchItems = async (params: GetItemsParams) => {
    const currentParamsToKeep: Omit<GetItemsParams, 'page'> = {
      keyWords: itemsResponse.data?.meta.keyWords,
      orderBy: itemsResponse.data?.meta.orderBy,
    };
    const newItemsResponse = await getItems({
      ...currentParamsToKeep,
      ...params,
    });
    if (
      newItemsResponse.data &&
      itemsResponse.data &&
      params.page &&
      params.page > itemsResponse.data?.meta.pagination.page
    ) {
      const itemsAccumulated = [
        ...itemsResponse.data.items,
        ...newItemsResponse.data.items,
      ];
      newItemsResponse.data.items = itemsAccumulated;
    }
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
