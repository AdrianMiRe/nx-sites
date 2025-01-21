import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';

import { City } from '../../interfaces/city'
import { Store } from '../../interfaces/store';

import proxyCalls from '../../lib/proxyCalls'
import useStorage from '../storage/useStorage';
import useToast from '../toasts/useToast';
import { StoreSelectInput } from '../../interfaces/storeSelectInput';

const GET_CITIES = `
  query GetCities {
    getCities(
      cityId: null
    ) {
      city_id
      city
    }
  }
`

const useStoreSelector = () => {

  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [resourcesLoading, setResourcesLoading] = useState<boolean>(false);
  const [citiesOpen, setCitiesOpen] = useState<boolean>(false);
  const [citiesLoading, setCitiesLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [storesOpen, setStoresOpen] = useState<boolean>(false);
  const [storesLoading, setStoresLoading] = useState<boolean>(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [user, setUser] = useState<string>('');

  const methods = useForm({
    defaultValues: {
      city: '',
      store: ''
    }
  });

  const { watch, setValue } = methods;
  const { setItem, getItem } = useStorage();
  const { notifyError } = useToast();
  const router = useRouter();

  const searchSeller = useCallback(async () => {
    setUserLoading(true);

    const { data, errors } = await proxyCalls(`query GetSellers { getSellers( firstName: null position: null erpNumber: null erpLogin: ${user} isActive: null createdAtFrom: null createdAtTo: null storeCode: null)
    { first_name last_name position erp_code erp_login store_city store_number store_code role_id } }`)

    if (errors) {
      setStoresLoading(false);
      return errors[0].message;
    }

    if (data) {
      setStoresLoading(false);
      return data.getSellers[0];
    }
  }, [user])

  const searchResources = useCallback(async (role: string) => {
    setResourcesLoading(true);
    const { data, errors } = await proxyCalls(`query GetResources { getResources ( roleId: "${role}" )
    { role_name role_resources { resource_id resource_name } } }`);

    if (errors) {
      setResourcesLoading(false);
      return errors[0].message;
    }

    if (data) {
      setResourcesLoading(false);
      return data.getResources;
    }
  }, [])

  const searchCities = useCallback(async () => {
    setCitiesLoading(true);

    const { data, errors } = await proxyCalls(GET_CITIES);
    
    if (errors) {
      setCitiesLoading(false);
      return errors[0].message
    }

    if (data) {
      setCitiesLoading(false);
      return data.getCities
    }
  }, [])

  const searchStores = useCallback(
    async (
      city?: { label: string, id: number} | string,
      number?: string,
      storeCode?: string
    ) => {

      setStoresLoading(true);
      const { data, errors } = await proxyCalls(`
        query GetStores {
          getStores (
            number: ${number ? `"${number.toString()}"` : null}
            name: null
            city: "${typeof city === 'object' ? city.label : city}"
            email: null
            isActive: 1
            createdAtFrom: null
            createdAtTo: null
            storeCode: ${storeCode ? `"${storeCode}"` : null}
          ) {
            number
            name
            city
            email
            store_code
          }
        }`)

      if (errors) {
        setStoresLoading(false);
        return errors[0].message;
      }

      if(data) {
        setStoresLoading(false);
        return data.getStores;
      }
    },
  [watch('city')])

  useEffect(() => {

    const sessionUser = getItem('username', 'session');
    setUser(sessionUser);

  }, [])

  useEffect(() => {
    if (user === '') return
    searchSeller()
      .then(data => {
        const seller = data;

        const sellerStorage = {
          employeeName: `${seller.last_name} ${seller.first_name}`, 
          employeeId: seller.erp_code,
          employeeType: seller.position,
          store_code: seller.store_code
        }

        setItem('seller', JSON.stringify(sellerStorage), 'session');

        if(seller.role_id !== null) {
          searchResources(seller.role_id)
            .then(data => {
              const resources = data[0].role_resources;
              const mappedResources = resources.map((res: { resource_name: string }) => {
                return {
                  resource: res.resource_name.split('::')[1]
                }
              })

              setItem('resources', JSON.stringify(mappedResources));

              if (seller.store_number !== null) {
                searchStores('', seller.store_number, seller.store_code)
                  .then(data => {
                    const store = data[0];
                    setItem('store', JSON.stringify(store));
                    router.push('/menu');
                  })
                  .catch()
              } else {
                searchCities()
                  .then(data => {
                    const cities = data.map((d: City) => {
                      return {
                        label: d.city,
                        id: d.city_id
                      }
                    })
                    setCities(cities)
                  })
                  .catch(error => console.log(error))
              }
            })
            .catch()
        }

        notifyError(`El usuario ${ seller.erp_code } no tiene un rol asignado, comuniquese con mesa de ayuda`)

      })
      .catch()
  }, [user])

  useEffect(() => {
    if (watch('city') === "") return;
    setValue('store', '');
    searchStores(watch('city'))
      .then(data => {
        const stores = data.map((d: Store) => {
          return {
            label: d.name.toUpperCase(),
            id: d.number
          }
        })
        setStores(stores)
      })
      .catch()
  }, [watch('city')])

  const handleOpenCities = useCallback(() => {
    setCitiesOpen(true);
  }, [])

  const handleCloseCities = useCallback(() => {
    setCitiesOpen(false);
  }, [])
  
  const handleOpenStores = useCallback(() => {
    setStoresOpen(true);
  }, [])

  const handleCloseStores = useCallback(() => {
    setStoresOpen(false);
  }, [])

  const onSubmit = (values: StoreSelectInput) => {
    console.log(values)
  }

  return {
    cities,
    stores,
    methods,
    citiesOpen,
    storesOpen,
    citiesLoading,
    storesLoading,
    onSubmit,
    handleOpenCities,
    handleOpenStores,
    handleCloseCities,
    handleCloseStores,
  }
}

export default useStoreSelector