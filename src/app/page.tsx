import { ItemsProvider } from '@/providers/ItemsProvider';
import { SearchForm } from '@/components/SearchForm';
import { getItems } from '@/lib/api/items';
import { ProductsSection } from '@/components/ProductsSection';
import { SortingSection } from '@/components/SortingSection';

import styles from './page.module.css';
import { FavoritesButton } from '@/components/FavoritesButton';

export default async function Home() {
  const itemsResponse = await getItems({});

  return (
    <ItemsProvider initialItemsResponse={itemsResponse}>
      <main id="main" className={styles.main}>
        <header>
          <h1>Item Manager</h1>
          <SearchForm />
          <SortingSection />
          <FavoritesButton />
        </header>
        <ProductsSection />
      </main>
    </ItemsProvider>
  );
}
