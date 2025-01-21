
import { useCallback, useEffect, useState } from "react";
import useIdle from "./useIdle";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useStorage from "@repo/graphql/hooks/storage/useStorage";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const useFullPage = () => {
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(15);
  const [body, setBody] = useState<string[]>([]);
  
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));
  
  const handleIdle = useCallback(() => {
    setRemainingTime(15);
    setShowModal(true)
  }, [])

  const millisToMinutesAndSeconds = useCallback((millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }, [])
  
  const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 30 });
  const { removeItem } = useStorage();
  const router = useRouter();

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if(isIdle && showModal) {
      interval = setInterval(() => {
        setRemainingTime((prt) => prt > 0 ? prt - 1 : 0)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  },[isIdle, showModal]);

  useEffect(() => {
    const onSignout = () => {
      setShowModal(false);
      Cookies.remove('currentUser');
      removeItem('resources', 'session');
      removeItem('seller', 'session');
      removeItem('store', 'session');
      removeItem('username', 'session');
      router.push('/login');
    }
  
    if(remainingTime === 0 && showModal) {
      onSignout()
    }
  }, [remainingTime, showModal]);

  useEffect(() => {
    let tempBody = [
      'Por motivos de seguridad, tu sesión se cerrará por inactividad',
      `Tu sesión se cerrara en ${ millisToMinutesAndSeconds(remainingTime * 1000) } segundos`,
      '¿Necesita mas tiempo para su transacción?'
    ];

    setBody(tempBody);
  }, [remainingTime])

  const handleSignOut = () => {
    setShowModal(false);
    Cookies.remove('currentUser');
    removeItem('resources', 'session');
    removeItem('seller', 'session');
    removeItem('store', 'session');
    removeItem('username', 'session');
    router.push('/login');
  }

  const handleStayLoggedIn = () => {
    setShowModal(false);
  }
  

  return {
    body,
    isIdle,
    matchesSm,
    showModal,
    handleSignOut,
    handleStayLoggedIn,
  }
}

export default useFullPage