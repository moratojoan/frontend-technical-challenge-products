'use client';

import { Iterator, type Order } from '@/lib/api/items/types';
import { getNewOrderBy, splitOrderBy } from '@/lib/helpers/order';
import { useItems } from '@/providers/ItemsProvider';

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
    <div>
      <p>Sort by:</p>
      <ul>
        <li>
          <button onClick={() => handleClick()}>Default</button>
        </li>
        <li>
          <button onClick={() => handleClick('title')}>
            Title {iterator === 'title' && <AscDescIcon order={order} />}
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('description')}>
            Description{' '}
            {iterator === 'description' && <AscDescIcon order={order} />}
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('email')}>
            Email {iterator === 'email' && <AscDescIcon order={order} />}
          </button>
        </li>
        <li>
          <button onClick={() => handleClick('price')}>
            Price {iterator === 'price' && <AscDescIcon order={order} />}
          </button>
        </li>
      </ul>
    </div>
  );
}

function AscDescIcon({ order }: { order?: Order }) {
  if (!order) return null;
  return <>{order === 'asc' ? '↑' : '↓'}</>;
}
