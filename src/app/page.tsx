import { ItemsProvider } from '@/providers/ItemsProvider';
import styles from './page.module.css';
import { SearchForm } from '@/components/SearchForm';
import { getItems } from '@/lib/api/items';
import { ProductsSection } from '@/components/ProductsSection';
import { SortingSection } from '@/components/SortingSection';

export default async function Home() {
  const itemsResponse = await getItems({});

  return (
    <ItemsProvider initialItemsResponse={itemsResponse}>
      <main className={styles.main}>
        <header>
          <h1>Item Manager</h1>
          <SearchForm />
          <SortingSection />
        </header>
        <ProductsSection />
      </main>
    </ItemsProvider>
  );
}
