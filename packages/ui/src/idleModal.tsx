'use client'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { StyledButton } from './button';

interface DialogProps {
  open: boolean
  title: string
  body: string[]
  primaryLabel: string
  secondaryLabel: string
  primaryAction: () => void
  secondaryAction: () => void
}

const IdleModal = ({
  open,
  title,
  body,
  primaryLabel,
  secondaryLabel,
  primaryAction,
  secondaryAction,
}: DialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle variant='h5' textAlign={'center'}>
        {title}
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={1}>
          {
            body.map(b => (
              <Typography key={b} textAlign={'center'}>
                { b }
              </Typography>
              )
            )
          }
        </Stack>

      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-around' }} >
        <StyledButton
          priority='secondary'
          variant='outlined'
          onClick={secondaryAction}
        >
          {secondaryLabel}
        </StyledButton>
        <StyledButton
          priority='primary'
          variant='contained'
          onClick={primaryAction}
        >
          {primaryLabel}
        </StyledButton>
      </DialogActions>
    </Dialog>
  )
}

export default IdleModal