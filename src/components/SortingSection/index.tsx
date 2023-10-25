'use client';

import { type Iterator } from '@/lib/api/items/types';
import { getNewOrderBy, splitOrderBy } from '@/lib/helpers/order';
import { useItems } from '@/providers/ItemsProvider';
import { Button } from '@/components/ui/Button';
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
          <Button
            variant={iterator === undefined ? 'primary' : 'secondary'}
            onClick={() => handleClick()}
          >
            Default order
          </Button>
        </li>
        <li className={styles['sorting-button-container']}>
          <Button
            variant={iterator === 'title' ? 'primary' : 'secondary'}
            onClick={() => handleClick('title')}
          >
            Title {iterator === 'title' && <AscDescIcon order={order} />}
          </Button>
        </li>
        <li className={styles['sorting-button-container']}>
          <Button
            variant={iterator === 'description' ? 'primary' : 'secondary'}
            onClick={() => handleClick('description')}
          >
            Description{' '}
            {iterator === 'description' && <AscDescIcon order={order} />}
          </Button>
        </li>
        <li className={styles['sorting-button-container']}>
          <Button
            variant={iterator === 'email' ? 'primary' : 'secondary'}
            onClick={() => handleClick('email')}
          >
            Email {iterator === 'email' && <AscDescIcon order={order} />}
          </Button>
        </li>
        <li className={styles['sorting-button-container']}>
          <Button
            variant={iterator === 'price' ? 'primary' : 'secondary'}
            onClick={() => handleClick('price')}
          >
            Price {iterator === 'price' && <AscDescIcon order={order} />}
          </Button>
        </li>
      </ul>
    </div>
  );
}
