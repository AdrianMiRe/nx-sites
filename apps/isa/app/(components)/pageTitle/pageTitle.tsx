
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {
  useMediaQuery,
  useTheme
} from '@mui/material';

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

interface PageTitleProps {
  title: string,
  handleClick: () => void
}

export default function PageTitle (props: PageTitleProps) {
  
  const {title, handleClick} = props;
  
  const theme = useTheme();
  const aboveMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box
      sx={{
        width: '100%',
        position: 'sticky',
        top: aboveMd ? '16px': '0px',
        zIndex: '3',
        background: 'var(--background)'
      }}>
    <Stack direction='row' sx={{ paddingBottom: '.5rem'}}>
      <IconButton size='large' onClick={() => handleClick()}>
        <ArrowBackIosNewOutlinedIcon fontSize="large" /> 
      </IconButton>
      <Typography variant="h5" sx={{ alignSelf: 'center', color: '#0000008a' }}>{title}</Typography>
    </Stack>
    </Box>
  );
}