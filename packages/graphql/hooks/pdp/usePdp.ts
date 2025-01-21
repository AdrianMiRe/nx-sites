import { ChangeEvent, MouseEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import _ from 'lodash';

import querySubstitution from '../../lib/querySubstitution';
import proxyCalls from '../../lib/proxyCalls';

import { ItemProps, Attributes, Gallery, PdpProps } from '../../interfaces/product';
import { GET_PRODUCT_DETAILS } from '../../queries/getProductDetails.gql';
import { GET_PRODUCT_FREQUENCIES } from '../../queries/getProductFreq.gql';
import { GET_PRODUCT_INVENTORY } from '../../queries/getProductInventory.gql';

import useLogger from '../logger/useLogger';
import useStorage from '../storage/useStorage';

const usePdp = (url_key: string) => {

  const methods = useForm({
    defaultValues: {
      leftSphere: '',
      leftCylinder: '',
      leftAxis: '',
      leftAdd: '',
      leftBase_curve: '',
      leftDiameter: '',
      leftColor: '',
      leftSku: '',
      leftQuantity: 1,
      rightSphere: '',
      rightCylinder: '',
      rightAxis: '',
      rightAdd: '',
      rightBase_curve: '',
      rightDiameter: '',
      rightColor: '',
      rightSku: '',
      rightQuantity: 1,
      frequency: '',
      deliver: '',
      inventoryStatus: 0,
      isStoreEnabled: false,
      quoteEmail: '',
      quoteFirstname: '',
      quoteLastname: '',
      quoteTaC: false,
      saleType: '',
      eye: '',
    }
  });

  const { getValues, setValue, watch } = methods;
  const router = useRouter();

  const [tab, setTab] = useState(0)
  const [minQty, setMinQty] = useState(0);
  const [maxQty, setMaxQty] = useState(0);
  const [product, setProduct] = useState<PdpProps>();
  const [openFreq, setOpenFreq] = useState(false);
  const [saleType, setSaleType] = useState('diff');
  const [frequencies, setFrequencies] = useState([]);
  const [searchingProd, setSearchingProd] = useState(false);
  const [searchingFreq, setSearchingFreq] = useState(false);
  const [searchingInv, setSearchingInv] = useState(false);
  const [warehouseHelperText, setWarehouseHelperText] = useState('');
  const [storeHelperText, setStoreHelperText] = useState('');
  const [storeDisabled, setStoreDisabled] = useState(false);
  const [naMessage, setNaMessage] = useState('');
  const [naProduct, setNaProduct] = useState(false);


  const {
    loggerInfo,
    loggerTrace,
    loggerError
  } = useLogger();

  const {
    setItem
  } = useStorage();

  const searchProduct = useCallback( async(url_key: string) => {
    setSearchingProd(true);

    const variables = {
      url_key
    }

    const getProductQ =  querySubstitution(GET_PRODUCT_DETAILS, variables);

    const { data } = await proxyCalls(getProductQ);

    const items = data && data.products.items;

    const foundedProduct = items.map( (item: ItemProps) => {
        
      const images = item.media_gallery.map((image: Gallery) => {
        return {
          text: item.name,
          image: image.url
        }
      });

      const attributes = item.custom_attributes.map((attrib: Attributes) => {
        if (attrib.selected_attribute_options.attribute_option !== null ) {
          return {
            label: attrib.attribute_metadata.label,
            value: attrib.selected_attribute_options.attribute_option[0].label
          }
        } else {
          return {
            label: attrib.attribute_metadata.label,
            value: attrib.entered_attribute_value.value
          }
        }
      }).filter(attr => attr);

      return {
        id: item.id,
        sku: item.sku,
        images,
        name: item.name,
        descripcion: item.description.html,
        originalPrice: item.price_range.maximum_price.regular_price,
        finalPrice: item.price_range.maximum_price.final_price,
        indicadoPara: item.Indicado_para1,
        attributes
      }
    });

    setProduct(foundedProduct[0])
    setSearchingProd(false);

  }, [url_key]);

  const getProductFrequencies = useCallback( async (qty: number, use: string, qty_box: number) => {
    setSearchingFreq(true);
    const variables = {
      qty,
      use,
      qty_box
    }

    const getFreqQ = querySubstitution(GET_PRODUCT_FREQUENCIES, variables);

    const { data } = await proxyCalls(getFreqQ);

    const freq = data && data.getProductFrecuencies[0];
    const minMax = data && data.getProductFrecuencies[0].min_max[0];

    setFrequencies(freq.frecuencies);
    setMinQty(minMax.min_qty);
    setMaxQty(minMax.max_qty);
    setSearchingFreq(false);
  }, []);

  const getProductInventory = useCallback( async (store: string, skus: {sku: string, qty: number}[]) => {
    setSearchingInv(true);

    const variables = {
      store,
      skus: JSON.parse(JSON.stringify(skus))
    }

    const getInvQ = querySubstitution(GET_PRODUCT_INVENTORY, variables);

    const { data, errors } = await proxyCalls(getInvQ);

    if (errors) {
      console.error(errors[0].message);
      setSearchingInv(false);
    }

    if (data) {
      const result = !!data && data.checkProductsInventory[0];

      if(result.status === 500) {
        console.error('setNaMessage and Naproduct', result.message)
        setNaMessage(result.message);
        setNaProduct(true)
      }

      if (store !== '98') {
        const disabled = result.status === 200 ? true : false;
        if (disabled) {
          setValue('deliver', 'home');
          setValue('inventoryStatus', 0);
          setWarehouseHelperText('');
          setStoreHelperText('');
        } else {
          setValue('deliver', 'store');
          setValue('inventoryStatus', 1);
          setWarehouseHelperText('');
          setStoreHelperText(result.message)
        }
        setValue('isStoreEnabled', disabled);
        setStoreDisabled(disabled);
        setSearchingInv(false);
      } else {
        if (result.status === 1) {
          setValue('deliver', storeDisabled ? 'home' : 'store');
        }

        setValue('inventoryStatus', result.status);
        setWarehouseHelperText(storeDisabled ? `${result.message} días` : '');
      }
    }

  }, [saleType, storeDisabled]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleTabChange = useCallback((e: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }, []);

  const handleSaleType = useCallback((event: MouseEvent<HTMLElement>, newSaleType: string) => {
    setSaleType(newSaleType);
    setValue('saleType', newSaleType);
  }, []);

  const handleOpenFreq = useCallback(() => {
    setOpenFreq(!openFreq);
  },[]);

  const handleSearchInventory = useCallback((eye: string) => {
    if (saleType === 'diff' && getValues('leftSku') === '' && eye !== 'left') {
      return;
    }
    
    const storeNP = sessionStorage.getItem('store');
    if (storeNP) {
      try {
        const store = JSON.parse(storeNP)?.number as string | undefined;
        
        // Asegúrate de que `store` no sea undefined antes de usarlo
        if (store) {
          let skus: {sku: string, qty: number}[] = [];
          if (saleType === 'diff') {
            skus = [
              {
                sku: getValues('rightSku'),
                qty: getValues('rightQuantity')
              }, {
                sku: watch('leftSku'),
                qty: getValues('leftQuantity')
              }
            ]
          } else {
            skus = [
              {
                sku: getValues('rightSku'),
                qty: getValues('rightQuantity')
              }
            ]
          }

          getProductInventory(store, skus)
          console.log(`Store number: ${store}`);
        } else {
          console.error('El store no tiene un número válido.');
        }
      } catch (error) {
        console.error('Error al parsear el store desde sessionStorage:', error);
      }
    } else {
      console.error('No hay un store en sessionStorage.');
    }
    
  }, [saleType]);

  // * TODO: define function beyond this
  const handleQtyChange = useCallback((newQty: number) => {
    console.log(newQty)
  }, []);

  const handleSetFields = useCallback(() => {
    console.log('Setting Fields')
  }, []);

  const handleToCheckout = useCallback(() => {
    setItem('form', JSON.stringify(getValues()));
    router.push('/checkout')
  }, []);

  const handleOpenQuote = useCallback(() => {
    console.log('Abriendo quote')
  }, []);

  const handleRadioChange = useCallback(( e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  }, [])

  const clearFields = () => {
    setValue('leftSphere', '');
    setValue('leftCylinder', '');
    setValue('leftAxis', '');
    setValue('leftAdd', '');
    setValue('leftBase_curve', '');
    setValue('leftDiameter', '');
    setValue('leftColor', '');
    setValue('leftSku', '');
    setValue('rightSphere', '');
    setValue('rightCylinder', '');
    setValue('rightAxis', '');
    setValue('rightAdd', '');
    setValue('rightBase_curve', '');
    setValue('rightDiameter', '');
    setValue('rightColor', '');
    setValue('rightSku', '');
    setValue('eye', '');
  };

  useEffect(() => {
    if (url_key === '') return;
    
    searchProduct(url_key)
    
  }, [url_key]);

  useEffect(() => {
    if (product === undefined) return;

    const qty = getValues('leftQuantity') + getValues('rightQuantity');
    const use = product.attributes.find(attr => attr.label === 'Tiempo de Uso')?.value || '';
    const boxContent = product.attributes.find(attr => attr.label === 'Contenido de Caja');
    const qty_box = boxContent ? parseInt(boxContent.value) : 0;

    getProductFrequencies(qty, use, qty_box)

  }, [product])

  useEffect(() => {
    console.log(saleType)
    switch(saleType) {
      case 'diff':
        setValue('saleType', saleType);
        clearFields();
        setValue('rightQuantity', 1);
        setValue('leftQuantity', 1);
        break;
      case 'same':
        clearFields();
        setValue('rightQuantity', 2);
        setValue('leftQuantity', 0);
        break;
      case 'one':
        clearFields();
        setValue('rightQuantity', 1);
        setValue('leftQuantity', 0);
        break;
      default:
        break;
    }
  }, [saleType]);

  useEffect(() => {
    if (watch('leftSku') !== '' && saleType === 'diff') return;
    if (watch('rightSku') === '') return;

    let skus: {sku: string, qty: number}[] = [];
    
    if(saleType === 'diff') {
      skus = [
        {
          sku: getValues('rightSku'),
          qty: getValues('rightQuantity')
        }, {
          sku: watch('leftSku'),
          qty: getValues('leftQuantity')
        }
      ]
    } else {
      skus = [
        {
          sku: getValues('rightSku'),
          qty: getValues('rightQuantity')
        }
      ]
    }

    getProductInventory('98', skus);

  }, [storeDisabled])
  
  
  return {
    tab,
    maxQty,
    minQty,
    product,
    methods,
    saleType,
    openFreq,
    naMessage,
    naProduct,
    frequencies,
    searchingInv,
    searchingProd,
    searchingFreq,
    storeDisabled,
    storeHelperText,
    warehouseHelperText,
    handleBack,
    handleOpenFreq,
    handleSaleType,
    handleQtyChange,
    handleTabChange,
    handleSetFields,
    handleOpenQuote,
    handleToCheckout,
    handleRadioChange,
    handleSearchInventory
  }
}

export default usePdp