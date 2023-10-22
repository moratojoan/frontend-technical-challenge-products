export interface Item {
  title: string;
  description: string;
  email: string;
  price: string;
  image: string;
}

export type KeyWords = string;
export type Order = 'asc' | 'desc';
export type Iterator = 'title' | 'description' | 'email' | 'price';
export type OrderBy = `${Iterator}_${Order}` | 'default';
interface Meta {
  keyWords?: KeyWords;
  orderBy?: OrderBy;
}
export interface ItemsData {
  items: Item[];
  meta: Meta;
}

export interface ItemsError {
  message: string;
}
