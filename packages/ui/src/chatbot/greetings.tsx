import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Greetings = (props: any) => {
  return (
    <Stack direction={'column'} flexWrap={'wrap'} justifyContent={'center'} spacing={1}>
      <Button variant='outlined' onClick={props.actionProvider.handleSelection} sx={{ borderRadius: '12px' }}>
        Estatus de pago
      </Button>
    </Stack>
  )
}

export default Greetings