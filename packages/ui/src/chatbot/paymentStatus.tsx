import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const PaymentStatus = (props: any) => {
  return (
    <Stack>
      <Stack direction={"row"} justifyContent={"space-around"}>
        <Button variant={'outlined'} sx={{ borderRadius: '20px'}} onClick={() => props.actionProvider.handleRecurrence("no")}>No</Button>
        <Button variant={'outlined'} sx={{ borderRadius: '20px'}} onClick={() => props.actionProvider.handleRecurrence("si")}>Si</Button>
      </Stack>
    </Stack>
  )
}

export default PaymentStatus