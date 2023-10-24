import { type Order } from '@/lib/api/items/types';

export function AscDescIcon({ order }: { order?: Order }) {
  if (!order) return null;
  return <>{order === 'asc' ? '↑' : '↓'}</>;
}
