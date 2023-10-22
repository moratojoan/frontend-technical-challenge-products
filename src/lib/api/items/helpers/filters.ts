import { type Item } from '../types';

export function filterItemsByKeyWords(
  items: Item[],
  keyWords: string | undefined
) {
  if (!keyWords) return items;

  const words = keyWords.trim().toLowerCase();
  if (words.length === 0) return items;

  return items.filter((item) => {
    if (item.title.toLowerCase().includes(words)) return true;
    if (item.description.toLowerCase().includes(words)) return true;
    if (item.email.toLowerCase().includes(words)) return true;
    if (item.price.toLowerCase().includes(words)) return true;
    return false;
  });
}
