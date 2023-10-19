import Image from 'next/image';
import styles from './page.module.css';
import { ProductListItem } from '@/components/ProductListItem';
import data from './data.json';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Item Manager</h1>
      <section>
        <ul>
          {data.items.map((item) => (
            <ProductListItem key={item.title} {...item} />
          ))}
        </ul>
      </section>
    </main>
  );
}
