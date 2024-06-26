import { type Item } from '@/lib/api/items/types';
import { useItems } from '@/providers/ItemsProvider';
import { Image } from '@/components/ui/Image';
import { Button } from '@/components/ui/Button';
import styles from './styles.module.css';

interface ProductListItemProps {
  item: Item;
  priority?: boolean;
}
export function ProductListItem({ item, priority }: ProductListItemProps) {
  const { addToFavorites, checkIfIsInFavorites, removeFromFavorite } =
    useItems();
  const isInFavorites = checkIfIsInFavorites(item);
  return (
    <li data-testid="product-item" className={styles['product-item']}>
      <div className={styles.content}>
        <header>
          <h2>{item.title}</h2>
          <Button
            variant={isInFavorites ? 'outlined' : 'primary'}
            size="small"
            onClick={() =>
              isInFavorites ? removeFromFavorite(item) : addToFavorites(item)
            }
          >
            {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        </header>
        <p>{item.price} €</p>
        {/* the price could be better formatted with Intl.NumberFormat.prototype.format() */}
        <p className={styles.description}>{item.description}</p>
        <p>{item.email}</p>
      </div>
      <div className={styles['image-container']}>
        <Image
          priority={priority}
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 768px) 100vw, 200px"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </li>
  );
}
