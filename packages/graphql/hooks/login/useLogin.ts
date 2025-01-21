import { useForm } from 'react-hook-form';
import { LoginInputs } from '../../interfaces/loginInputs';
import { createHash } from 'crypto';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import Cookies from 'js-cookie';

import useToast from '@repo/graphql/hooks/toasts/useToast'
import useStorage from '@repo/graphql/hooks/storage/useStorage';

const useLogin = () => {

  const [type, setType] = useState<'password' | 'text'>('password');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const { notifyError } = useToast();
  const { setItem } = useStorage();
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      'user': '',
      'pass': ''
    }
  })

  const handleVisibility = () => {
    if (type === 'password') 
      setType('text')
    else
      setType('password')
  }

  const onSubmit = async (values: LoginInputs) => {
    setLoading(true);

    /**Always Logged */
    Cookies.set('currentUser', 'Rivero Emilia')
    setItem('username', values.user, 'session')
    setLoading(false);
    router.push('/store-selector');

    return;
    /**** */

    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation StoreLoginMutation {
            storeLogin(
              input: {
                username: "${values.user}"
                password: "${ createHash('sha512').update(values.pass).digest('hex') }"
              }
            ) {
              status
              message
              name
            }
          }
        `,
      })
    });

    const { data, errors } = await response.json();

    if (errors) {
      setLoading(false);
      notifyError(errors[0].message);
      return errors[0].message;
    }

    if (data.storeLogin[0].status === 1) {
      Cookies.set('currentUser', data.storeLogin[0].name)
      setItem('username', values.user, 'session')
      setLoading(false);
      router.push('/store-selector');
    }

    if (data.storeLogin[0].status === 0) {
      notifyError(data.storeLogin[0].message)
    }
    
    setLoading(false);
    return data;
  };

  return {
    type,
    upMd,
    downMd,
    loading,
    methods,
    onSubmit,
    handleVisibility
  }

}

export default useLogin