import { Item } from '@/lib/api/items';
import Image from 'next/image';

interface ProductListItemProps extends Item {}
export function ProductListItem(props: ProductListItemProps) {
  return (
    <li data-testid="product-item">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p>{props.email}</p>
      <p>{props.price}</p>
      <Image src={props.image} alt={props.title} width={200} height={200} />
    </li>
  );
}
