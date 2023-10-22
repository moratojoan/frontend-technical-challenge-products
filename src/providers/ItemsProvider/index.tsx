'use client';

import { ReactNode, createContext, useContext, useState } from 'react';
import { GetItemsParams, getItems } from '@/lib/api/items';
import {
  type Item,
  type ItemsData,
  type ItemsError,
} from '@/lib/api/items/types';
import { ApiResponse } from '@/lib/api/types';
import lodashIsEqual from 'lodash.isequal';

interface ItemsProviderValue {
  itemsResponse: ApiResponse<ItemsData, ItemsError>;
  favorites: Item[];
  fetchItems: (params: GetItemsParams) => void;
  addToFavorites: (item: Item) => void;
  checkIfIsInFavorites: (item: Item) => boolean;
  removeFromFavorite: (itemToRemove: Item) => void;
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
  favorites: [],
  fetchItems: () => {},
  addToFavorites: () => {},
  checkIfIsInFavorites: () => false,
  removeFromFavorite: () => {},
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
  const [favorites, setFavorites] = useState<Item[]>([]);

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

  const addToFavorites = (item: Item) => {
    const isInFavorites = checkIfIsInFavorites(item);
    if (isInFavorites) return;
    setFavorites((state) => [...state, item]);
  };

  const checkIfIsInFavorites = (item: Item) => {
    /* 
      Ideally the item object should have an id. Then it could be compared using
      the ids. As the items have it, I have decided to compare the whole object,
      to avoid the possibility that 2 items have the same title.
    */
    return favorites.some((favItem) => lodashIsEqual(item, favItem));
  };

  const removeFromFavorite = (itemToRemove: Item) => {
    const favoritesUpdated = favorites.filter(
      (item) => !lodashIsEqual(itemToRemove, item)
    );
    setFavorites(favoritesUpdated);
  };
  return (
    <ItemsContext.Provider
      value={{
        itemsResponse,
        favorites,
        fetchItems,
        addToFavorites,
        checkIfIsInFavorites,
        removeFromFavorite,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
export function useItems() {
  return useContext(ItemsContext);
}
