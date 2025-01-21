
const useProductList = () => {
   
  const fetchProducts = async () => {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
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
        `,
      }),
    });
  
    const data = await response.json();
    return data;
  };
  
  return {
    fetchProducts
  }
}

export default useProductList