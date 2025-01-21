'use client'

import Link from '@mui/material/Link'
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import AutocompleteOption from "../../(components)/autocompleteOption/autocompleteOption";
import useMenu  from '@repo/graphql/hooks/menu/useMenu';
import { StyledButton } from '@repo/ui/button';

import styles from '../../styles/menu.module.css';
import { styled } from '@mui/material/styles';
import useAutocomplete from '@repo/graphql/hooks/autocomplete/useAutocomplete';

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    // boxSizing: 'border-box',
    border: `1px solid ${process.env.STORE_VIEW_CODE === 'lux_seller' ? '#E40D2C': '#FE4E1E'}`,
    '& ul': {
      padding: 0,
      margin: 0,
      zIndex: 2
    },
  },
});

const Menu = () => {

  const {
    open,
    value,
    inputValue,
    autoLoading,
    autocompleteProducts,
    handleValue,
    handleInputValue,
  } = useAutocomplete();

  const {
    matchesMd,
    handleMixedSale,
    handleToProducts,
    handleRecoverQuote
  } = useMenu();

  return (
    <Container maxWidth='xl'>
      <Stack
        width={'100%'}
        spacing={4}      
      >
        <Typography
          variant="h4"
          sx={{
            mt: matchesMd ? "1rem !important" : 0
          }}
        >
          Bienvenido
        </Typography>

        <Stack
          direction={matchesMd ? 'row' : 'column'}
          spacing={2}
          sx={{
            justifyContent: 'space-around',
            mt: matchesMd ? '1.5rem !important' : '0 !important'
          }}
        >

          <Card className={styles['landing-card']}>
            <CardHeader
              action={
                <Tooltip
                  arrow
                  placement='top'
                  title='Si tu cliente sabe su producto, selecciona esta opción'
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 700 }}
                >
                  <IconButton>
                    <HelpOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              }
              title={ <Typography variant='h6'>Buscar Producto</Typography>  }
            />

            <CardContent>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  handleValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(e, value) => {
                  handleInputValue(value)
                }}
                open={open}
                id="products-autocomplete"
                loading={autoLoading}
                size='small'
                disableClearable
                disableCloseOnSelect
                PopperComponent={StyledPopper}
                options={autocompleteProducts}
                sx={{ width: '100%' }}
                renderOption={(props, option) => (<AutocompleteOption key={option.id} props={props} option={option} />)}
                // renderInput={(params) => <TextField {...params} label="Movie" />}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment sx={{ pr: '10px' }} position="end">
                            {
                              autoLoading && (
                                <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path style={{ fill: 'var(--primary-color)' }} d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
                              )
                            }
                            <IconButton
                              aria-label="search-product"
                              edge="end"
                            >
                              <SearchOutlinedIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          background: '#fff',
                          borderRadius: open ? '20px 20px 0px 0px' : '20px',
                          transition: 'border-radius 0.1s linear'
                        }
                      }
                    }}
                  />
                )}
              />
              <Stack direction='row' sx={{ mt: 2, justifyContent: 'end' }}>
                <StyledButton
                  priority='primary'
                  variant='text'
                  onClick={ () => handleToProducts() }
                >
                  Ver Todo
                </StyledButton>
              </Stack>
            </CardContent>
          </Card>

          <Card className={styles['landing-card']}>
            <CardHeader
              action={
                <Tooltip
                  arrow
                  placement='top'
                  title='Si tu cliente cuenta con su fórmula, selecciona esta opción'
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 700 }}
                >
                  <IconButton>
                    <HelpOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              }
              title={ <Typography variant='h6'>Venta</Typography>  }
            />
            <CardActions
              sx={{
                justifyContent: 'space-evenly',
                flexDirection: matchesMd ? 'row' : 'column'
              }}>
              <StyledButton
                priority='primary'
                variant='contained'
                onClick={ () => handleRecoverQuote() }
                styles={{
                  width: matchesMd ? '45%' : '100%'
                }}
              >
                Recuperar Cotización
              </StyledButton>

              <StyledButton
                priority='primary'
                variant='contained'
                onClick={ () => handleMixedSale() }
                styles={{
                  width: matchesMd ? '45%' : '100%',
                  marginTop: matchesMd ? 0 : '1rem'
                }}
              >
                Venta Mixta
              </StyledButton>
            </CardActions>
          </Card>

        </Stack>

      </Stack>
    </Container>
  )
}

export default Menu