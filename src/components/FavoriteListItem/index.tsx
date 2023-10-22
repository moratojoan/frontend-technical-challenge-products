import { type Item } from '@/lib/api/items/types';
import { useItems } from '@/providers/ItemsProvider';
import Image from 'next/image';

interface FavoriteListItemProps {
  item: Item;
}
export function FavoriteListItem({ item }: FavoriteListItemProps) {
  const { removeFromFavorite } = useItems();
  return (
    <li data-testid="favorite-item" key={item.title + item.description}>
      <h2>{item.title}</h2>
      <Image src={item.image} alt={item.title} width={100} height={100} />
      <button onClick={() => removeFromFavorite(item)}>
        Remove from favorite
      </button>
    </li>
  );
}
