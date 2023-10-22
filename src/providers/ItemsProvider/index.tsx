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
  itemsResponse: { data: { items: [] }, error: null },
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

  const fetchItems = async ({ keyWords }: FetchItemsParams) => {
    const itemsResponse = await getItems({ keyWords });
    setItemsResponse(itemsResponse);
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
