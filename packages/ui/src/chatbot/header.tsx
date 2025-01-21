import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Header = () => {

  return (
    <Stack
      py={1}
      px={2}
      sx={{
        backgroundColor: "var(--primary-color)"
      }}
    >
      <Typography sx={{ color: "white" }} >¿Cómo puedo ayudarte?</Typography>
    </Stack>
  )
}

export default Header