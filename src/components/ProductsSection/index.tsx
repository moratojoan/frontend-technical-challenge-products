'use client';

import { useItems } from '@/providers/ItemsProvider';
import { ProductListItem } from '../ProductListItem';

export function ProductsSection() {
  const {
    itemsResponse: { data, error },
    fetchItems,
  } = useItems();
  return (
    <section>
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <ul>
            {data.items.map((item) => (
              <ProductListItem key={item.title} {...item} />
            ))}
          </ul>
          {data.meta.pagination.hasNextPage && (
            <button
              onClick={() => {
                fetchItems({ page: data.meta.pagination.page + 1 });
              }}
            >
              Show more items
            </button>
          )}
        </>
      )}
    </section>
  );
}
