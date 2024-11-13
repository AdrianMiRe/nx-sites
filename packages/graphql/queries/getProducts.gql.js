import { gql, useQuery } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(search: "") {
      items {
        id
        name
        sku
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
      }
    }
  }
`;
