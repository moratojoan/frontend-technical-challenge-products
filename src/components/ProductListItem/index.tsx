import { type Item } from '@/lib/api/items/types';
import { useItems } from '@/providers/ItemsProvider';
import { Image } from '@/components/ui/Image';

interface ProductListItemProps {
  item: Item;
}
export function ProductListItem({ item }: ProductListItemProps) {
  const { addToFavorites, checkIfIsInFavorites, removeFromFavorite } =
    useItems();
  const isInFavorites = checkIfIsInFavorites(item);
  return (
    <li data-testid="product-item">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>{item.email}</p>
      <p>{item.price}</p>
      <Image src={item.image} alt={item.title} width={200} height={200} />
      <button
        onClick={() =>
          isInFavorites ? removeFromFavorite(item) : addToFavorites(item)
        }
      >
        {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </li>
  );
}
