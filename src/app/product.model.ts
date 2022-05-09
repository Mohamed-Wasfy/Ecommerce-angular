interface Color {
  colorName: string;
  colorHex: string;
}

export interface ProductDB {
  _id: string;
  image: string;
  price: number;
  isOnSale: boolean;
  name: string;
  description: string;
  category: string;
  countInStock: number;
  __v: number;
  images: string[];
  colors: Color[];
  sizes: string[];
  dateCreated: string;
}
