import { type Item } from '@/lib/api/items/types';
import { useItems } from '@/providers/ItemsProvider';
import { Image } from '@/components/ui/Image';
import styles from './styles.module.css';
import { Button } from '../ui/Button';

interface FavoriteListItemProps {
  item: Item;
}
export function FavoriteListItem({ item }: FavoriteListItemProps) {
  const { removeFromFavorite } = useItems();
  return (
    <li data-testid="favorite-item" className={styles['favorite-item']}>
      <header>
        <h2>{item.title}</h2>
        <Button
          variant="outlined"
          size="small"
          onClick={() => removeFromFavorite(item)}
        >
          Remove from favorite
        </Button>
      </header>
      <Image src={item.image} alt={item.title} width={100} height={100} />
    </li>
  );
}
