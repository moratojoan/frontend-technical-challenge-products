import styles from './page.module.css';
import { ProductListItem } from '@/components/ProductListItem';
import { getItems } from '@/lib/api/items';

export default async function Home() {
  const { data, error } = await getItems();

  return (
    <main className={styles.main}>
      <h1>Item Manager</h1>
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
    </main>
  );
}
