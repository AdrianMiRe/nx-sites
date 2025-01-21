import { FormProvider } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";

import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import useSupportAdvertise from './hooks/useSupportAdvertise';
import Chatbot from '../chatbot/chatbot';

const SupportAdvertise = ( { upMobile }: {upMobile: Boolean}) => {

  const {
    id,
    open,
    methods,
    anchorEl,
    handleClick,
    handleClose
  } = useSupportAdvertise();

  return (
    <FormProvider {...methods} >
      <Stack position={'fixed'} bottom={upMobile ? 30 : 75} right={15}>
        <IconButton
          color={'primary'}
          aria-describedby={id}
          size={'large'}
          onClick={handleClick}
          sx={{
            backgroundColor: 'var(--primary-color)'
          }}
        >
          <HelpCenterIcon fontSize={'large'} sx={{ color: 'white' }} />
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <Chatbot />
        </Popover>
      </Stack>
    </FormProvider>
  )
}

export default SupportAdvertise;