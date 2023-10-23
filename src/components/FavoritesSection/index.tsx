import { ChangeEventHandler, useState } from 'react';
import { useItems } from '@/providers/ItemsProvider';
import { FavoriteListItem } from '../FavoriteListItem';

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
      <header>
        <h1>Favorite Items</h1>
        <label htmlFor="search-by-title">Search by title</label>
        <input
          id="search-by-title"
          type="text"
          placeholder="Search by title..."
          onChange={handleInputChange}
        />
        <button onClick={onClose}>Close Modal</button>
      </header>
      <section>
        {favoritesFiltered.map((item) => (
          <FavoriteListItem key={item.title + item.description} item={item} />
        ))}
      </section>
    </>
  );
}
