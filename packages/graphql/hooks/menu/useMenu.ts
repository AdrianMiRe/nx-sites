import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

const useMenu = () => {
  
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('sm'));
  const router = useRouter();

  const handleToProducts = () => {
    router.push('/menu/products');
  }

  const handleRecoverQuote = () => {
    router.push('/menu/quotes');
  }

  const handleMixedSale = () => {
    router.push('/menu/mixed');
  }

  return {
    matchesMd,
    handleMixedSale,
    handleToProducts,
    handleRecoverQuote
  }
}

export default useMenu