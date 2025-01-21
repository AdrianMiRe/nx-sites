import { useRouter } from 'next/navigation';
import { useState, MouseEvent, useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MenuItemStyles, menuClasses } from 'react-pro-sidebar';
import Cookies from 'js-cookie';

import { StoreSelectInput } from '../../interfaces/storeSelectInput';
import { City } from '../../interfaces/city';
import { Store } from '../../interfaces/store';

import proxyCalls from '../../lib/proxyCalls';
import useStorage from '../storage/useStorage';
import useLogger from '@repo/graphql/hooks/logger/useLogger';

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

const useSidebar = () => {
  
  const methods = useForm<StoreSelectInput>({
    defaultValues: {
      city: { label: '', id: 0},
      store: { label: '', id: ''}
    }
  });

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '14px',
      // fontWeight: 400,
    },
    icon: {
      color: 'var(--primary-color)',
      backgroundColor: 'var(--background)',
      borderRadius: '8px',
      boxShadow: '1px 1px 4px 2px var(--shadow-color)',
      [`&.${menuClasses.disabled}`]: {
        color: 'var(--disabled-color)',
      },
    },
    SubMenuExpandIcon: {
      color: '#5e5e5e',
    },
    subMenuContent: () => ({
      backgroundColor: 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: 'var(--disabled-color)',
      },
      '&:hover': {
        backgroundColor: 'var(--primary-color-100)',
        color: 'var(--foreground)',
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const { watch, setValue } = methods;
  const { getItem, removeItem } = useStorage();
  const { loggerInfo } = useLogger();
  const router = useRouter();
  
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [changeStore, setChangeStore] = useState<boolean>(false);
  const [citiesOpen, setCitiesOpen] = useState<boolean>(false);
  const [citiesLoading, setCitiesLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [storesOpen, setStoresOpen] = useState<boolean>(false);
  const [storesLoading, setStoresLoading] = useState<boolean>(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [acName, setacName] = useState('');
  const [acStore, setAcStore] = useState('');
  const [acInitials, setAcInitials] = useState('');
  
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
  }, []);

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
  [watch('city')]);

  useEffect(() => {
    const name = JSON.parse(getItem('seller')).employeeName;
    setacName(name);
    setAcStore(JSON.parse(getItem('store')).name);
    let initials = name.split(' ').map((data : string) => {
      if (data !== '') return data.substring(0,1);
    });
    initials = initials.filter((value: string) => value !== undefined)
    setAcInitials(initials.join(''))
  }, [])
  
  useEffect(() => {
    if(!changeStore) return;

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

  }, [searchCities, changeStore]);

  useEffect(() => {
    if (watch('city')?.label === "") return;
    setValue('store', {label: '', id: ''});
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
      .catch(error => console.log(`error en search stores: ${error}`));
  }, [watch('city')])
  

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStore = () => {
    setChangeStore(!changeStore)
  }
  
  const handleCollapsed = () => {
    setCollapsed(!collapsed)
  };

  const handleLogOut = useCallback(() => {
    Cookies.remove('currentUser');
    removeItem('resources', 'session');
    removeItem('seller', 'session');
    removeItem('store', 'session');
    removeItem('username', 'session');
    router.push('/login');
  }, [])

  const handleOpenCities = useCallback(() => {
    setCitiesOpen(true);
  }, []);

  const handleCloseCities = useCallback(() => {
    setCitiesOpen(false);
  }, []);

  const handleOpenStores = useCallback(() => {
    setStoresOpen(true);
  }, []);

  const handleCloseStores = useCallback(() => {
    setStoresOpen(false);
  }, []);

  const onSubmit: SubmitHandler<StoreSelectInput> = (values: StoreSelectInput) => {
    const username = getItem('username', 'session');
    const city = values.city.label;
    const storeNumber = values.store.id;

    const variables = {
      username,
      city,
      storeNumber
    }

    loggerInfo('sidebar', JSON.stringify(variables), 'useSidebar -> onSubmit')
    
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;

  return {
    id,
    open,
    cities,
    stores,
    router,
    acName,
    acStore,
    methods,
    anchorEl,
    collapsed,
    acInitials,
    citiesOpen,
    storesOpen,
    changeStore,
    storesLoading,
    citiesLoading,
    menuItemStyles,
    onSubmit,
    handleClick,
    handleClose,
    handleLogOut,
    handleCollapsed,
    handleOpenCities,
    handleOpenStores,
    handleChangeStore,
    handleCloseCities,
    handleCloseStores,
  }
}

export default useSidebar