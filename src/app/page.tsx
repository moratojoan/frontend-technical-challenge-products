import { ItemsProvider } from '@/providers/ItemsProvider';
import { SearchForm } from '@/components/SearchForm';
import { getItems } from '@/lib/api/items';
import { ProductsSection } from '@/components/ProductsSection';
import { SortingSection } from '@/components/SortingSection';

import styles from './styles.module.css';
import { FavoritesButton } from '@/components/FavoritesButton';
import { Header } from '@/components/Header';

export default async function Home() {
  const itemsResponse = await getItems({});

  return (
    <ItemsProvider initialItemsResponse={itemsResponse}>
      <Header>
        <FavoritesButton />
      </Header>
      <main id="main" className={styles.main}>
        <section className={styles['explore-section']}>
          <SearchForm />
          <SortingSection />
        </section>
        <ProductsSection />
      </main>
    </ItemsProvider>
  );
}
