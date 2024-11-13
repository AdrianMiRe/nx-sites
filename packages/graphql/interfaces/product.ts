export interface Product {
  id: string;
  name: string;
  sku: string;
  price: {
    regularPrice: {
      amount: {
        value: number;
        currency: string;
      };
    };
  };
}
