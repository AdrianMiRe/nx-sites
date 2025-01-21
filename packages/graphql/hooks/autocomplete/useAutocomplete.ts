import { useCallback, useEffect, useState } from "react";
import querySubstitution from '../../lib/querySubstitution';
import proxyCalls from '../../lib/proxyCalls';

import { useRouter } from 'next/navigation';
import { AutocompleteProps , ProductProps } from '../../interfaces/product';

const GET_AUTOCOMPLETE_RESULTS = `
  query GetAutocompleteResults { products(filter: { name: { match: {inputText} } }, currentPage: 1, pageSize: 10) {
  items { uid id name small_image { url } price_range { maximum_price { regular_price { value currency } final_price { value currency } discount { amount_off percent_off } } } url_key } page_info { total_pages } total_count } }`

const useAutocomplete = () => {

  const [value, setValue] = useState<AutocompleteProps>();
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [autocompleteProducts, setAutocompleteProducts] = useState([]);
  const [autoLoading, setAutoLoading] = useState(false);

  const router = useRouter();

  const searchProducts = useCallback( async (inputText: string) => {
    setAutoLoading(true);
    const variables = {
      inputText
    }

    const getProductsQ = querySubstitution(GET_AUTOCOMPLETE_RESULTS, variables)

    const {data} = await proxyCalls(getProductsQ);

    const products = data.products.items.map((product: ProductProps) => {
      return {
        id: product.id,
        label: product.name,
        image: product.small_image.url,
        originalPrice: product.price_range.maximum_price.regular_price,
        finalPrice: product.price_range.maximum_price.final_price,
        url_key: product.url_key
      }
    });

    setAutocompleteProducts(products)
    setAutoLoading(false);
    console.log(data);
  }, []) 

  useEffect(() => {
    if (inputValue && inputValue.length > 4) {
      searchProducts(inputValue)
    }
  }, [inputValue])

  useEffect(() => {
    if (autocompleteProducts.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [autocompleteProducts])

  useEffect(() => {
    setOpen(false);
    setAutocompleteProducts([]);

    if (!value) return;
    window.history.pushState({state: { product: value}}, '');
    router.push(`/menu/products/${value['url_key']}`);
  }, [value])
  
  const handleInputValue = (newValue: string) => {
    setInputValue(newValue);
    if (newValue === "") {
      setAutocompleteProducts([]);
    }
  };

  const handleValue = (newValue: AutocompleteProps) => {
    setValue(newValue);
  }

  return {
    open,
    value,
    inputValue,
    autoLoading,
    autocompleteProducts,
    handleInputValue,
    handleValue
  }
}

export default useAutocomplete