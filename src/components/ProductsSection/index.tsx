'use client';

import { useItems } from '@/providers/ItemsProvider';
import { ProductListItem } from '../ProductListItem';

export function ProductsSection() {
  const {
    itemsResponse: { data, error },
  } = useItems();
  return (
    <section>
      {error && <p>{error.message}</p>}
      {data && (
        <ul>
          {data.items.map((item) => (
            <ProductListItem key={item.title} {...item} />
          ))}
        </ul>
      )}
    </section>
  );
}
