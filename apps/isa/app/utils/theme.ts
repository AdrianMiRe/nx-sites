import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let ctheme = createTheme({
  palette:{
    primary: {
      main: '#005ABB'
    }
  },
  typography: {
    fontFamily: 'Orgon, Arial',
  }
});

const theme = responsiveFontSizes(ctheme)

export default theme