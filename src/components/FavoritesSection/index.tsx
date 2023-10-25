import { ChangeEventHandler, useState } from 'react';
import { useItems } from '@/providers/ItemsProvider';
import { FavoriteListItem } from '../FavoriteListItem';
import { Header } from '../Header';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import styles from './styles.module.css';

export function FavoritesSection({ onClose }: { onClose: () => void }) {
  const { favorites } = useItems();
  const [searchTitle, setSearchTitle] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTitle(event.target.value);
  };

  /* 
    I don't use useMemo to cache the result of "favoritesFiltered" because in
    this case it will only be recalculated when "favorites" or "searchTitle"
    is updated. There is no other state or prop that causes "favoritesFilters"
    to be recalculated, so using useMemo would not provide any benefit.
    "onClose" will not change while the Modal is open.
  */
  const favoritesFiltered = favorites.filter((item) =>
    item.title.toLowerCase().includes(searchTitle.trim().toLowerCase())
  );
  return (
    <>
      <Header title="Favorite Items">
        <Button onClick={onClose}>Close</Button>
      </Header>
      <div className={styles.content}>
        <section className={styles['search-container']}>
          <label htmlFor="search-by-title" className="sr-only">
            Search by title
          </label>
          <SearchInput
            id="search-by-title"
            type="text"
            placeholder="Search by title..."
            onChange={handleInputChange}
          />
        </section>
        <section className={styles['favorites-section']}>
          <ul className={styles['favorites-list']}>
            {favoritesFiltered.map((item) => (
              <FavoriteListItem
                key={item.title + item.description}
                item={item}
              />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
