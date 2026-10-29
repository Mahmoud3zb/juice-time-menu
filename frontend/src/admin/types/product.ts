export interface ProductItem {
  _id: string;
  name: string;
  prices: {
    cup: number;
    liter?: number;
  };
  priceType?: "cup_liter" | "single_double" | "single_price";
  type: string;
  description?: string;
  imageurl?: string;
  createdAt?: string;
  updatedAt?: string;
}
