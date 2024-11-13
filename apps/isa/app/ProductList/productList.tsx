"use client";

import { useQuery } from "@apollo/client";
import { ProductsData } from "@repo/graphql/interfaces/productsData";
import { GET_PRODUCTS } from "@repo/graphql/queries/getProducts.gql";

export const ProductList = () => {
  const { loading, error, data } = useQuery<ProductsData>(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.products.items.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price.regularPrice.amount.value} {product.price.regularPrice.amount.currency}
          </li>
        ))}
      </ul>
    </div>
  );
};
