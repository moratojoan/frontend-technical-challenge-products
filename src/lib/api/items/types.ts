export interface Item {
  title: string;
  description: string;
  email: string;
  price: string;
  image: string;
}

export interface ItemsData {
  items: Item[];
}

export interface ItemsError {
  message: string;
}
