'use client';

import { useItems } from '@/providers/ItemsProvider';
import { Button } from '@/components/ui/Button';
import { ProductListItem } from '../ProductListItem';
import styles from './styles.module.css';

export function ProductsSection() {
  const {
    itemsResponse: { data, error },
    fetchItems,
  } = useItems();
  return (
    <section className={styles['products-section']}>
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <ul className={styles['product-list']}>
            {data.items.map((item, index) => (
              <ProductListItem
                /*
                  As the items have no Id, I use the description as key to
                  avoid the case that more than one item has the same title.
                */
                key={item.title + item.description}
                item={item}
                priority={index === 0}
              />
            ))}
          </ul>
          {data.meta.pagination.hasNextPage && (
            <Button
              size="large"
              onClick={() => {
                fetchItems({ page: data.meta.pagination.page + 1 });
              }}
            >
              Show more items
            </Button>
          )}
        </>
      )}
    </section>
  );
}
