import { type Item } from '@/lib/api/items/types';
import { useItems } from '@/providers/ItemsProvider';
import Image from 'next/image';

interface ProductListItemProps {
  item: Item;
}
export function ProductListItem({ item }: ProductListItemProps) {
  const { addToFavorites, checkIfIsInFavorites } = useItems();
  const isInFavorites = checkIfIsInFavorites(item);
  return (
    <li data-testid="product-item">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>{item.email}</p>
      <p>{item.price}</p>
      <Image src={item.image} alt={item.title} width={200} height={200} />
      <button disabled={isInFavorites} onClick={() => addToFavorites(item)}>
        {isInFavorites ? 'Added to favorites' : 'Add to favorites'}
      </button>
    </li>
  );
}
