'use client';

import { type Iterator } from '@/lib/api/items/types';
import { getNewOrderBy, splitOrderBy } from '@/lib/helpers/order';
import { useItems } from '@/providers/ItemsProvider';
import { SortingButton } from './components/SortingButton';
import { AscDescIcon } from './components/AscDescIcon';
import styles from './styles.module.css';

export function SortingSection() {
  const {
    itemsResponse: { data },
    fetchItems,
  } = useItems();

  const actualOrderBy = data?.meta.orderBy;
  const [iterator, order] = actualOrderBy
    ? splitOrderBy(actualOrderBy)
    : [undefined, undefined];

  const handleClick = (newIterator?: Iterator) => {
    const newOrderBy = getNewOrderBy(
      { actualIterator: iterator, actualOrder: order },
      { newIterator }
    );
    fetchItems({ orderBy: newOrderBy });
  };
  return (
    <div className={styles['sorting-container']}>
      <p className="sr-only">Sort by:</p>
      <ul className={styles['sorting-options']}>
        <li className={styles['sorting-button-container']}>
          <SortingButton
            selected={iterator === undefined}
            onClick={() => handleClick()}
          >
            Default order
          </SortingButton>
        </li>
        <li className={styles['sorting-button-container']}>
          <SortingButton
            selected={iterator === 'title'}
            onClick={() => handleClick('title')}
          >
            Title {iterator === 'title' && <AscDescIcon order={order} />}
          </SortingButton>
        </li>
        <li className={styles['sorting-button-container']}>
          <SortingButton
            selected={iterator === 'description'}
            onClick={() => handleClick('description')}
          >
            Description{' '}
            {iterator === 'description' && <AscDescIcon order={order} />}
          </SortingButton>
        </li>
        <li className={styles['sorting-button-container']}>
          <SortingButton
            selected={iterator === 'email'}
            onClick={() => handleClick('email')}
          >
            Email {iterator === 'email' && <AscDescIcon order={order} />}
          </SortingButton>
        </li>
        <li className={styles['sorting-button-container']}>
          <SortingButton
            selected={iterator === 'price'}
            onClick={() => handleClick('price')}
          >
            Price {iterator === 'price' && <AscDescIcon order={order} />}
          </SortingButton>
        </li>
      </ul>
    </div>
  );
}
