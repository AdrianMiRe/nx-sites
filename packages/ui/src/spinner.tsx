'use client'

import Backdrop from '@mui/material/Backdrop';
import { MutatingDots } from 'react-loader-spinner';

interface SpinnerProps {
  open: boolean
}

export const GeneralSpinner = ({ open }: SpinnerProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        position: 'absolute',
        zIndex: 5,
        backgroundColor: 'rgba(0, 90, 187, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 90, 187, 0.1)',
        backdropFilter: 'blur(5.1px)'
      }}
    >
      <MutatingDots
        visible={true}
        height={'100'}
        width={'100'}
        color={'var(--primary-color)'}
        secondaryColor={'var(--secondary-color)'}
        radius="10"
        ariaLabel="mutating-dots-loading"
      />
    </Backdrop>
  )
} 