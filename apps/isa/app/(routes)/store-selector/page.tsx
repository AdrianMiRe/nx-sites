'use client'

import { FormProvider } from 'react-hook-form';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';

import { StyledButton } from '@repo/ui/button'
import { GeneralSpinner } from '@repo/ui/spinner';
import useStoreSelector from '@repo/graphql/hooks/store-selector/useStoreSelector';

import styles from '../../styles/store-selector.module.css';
import { FormAutocomplete } from '@repo/ui/formAutocomplete';

const StoreSelector = () => {

  const {
    cities,
    stores,
    methods,
    citiesOpen,
    storesOpen,
    citiesLoading,
    storesLoading,
    onSubmit,
    handleOpenCities,
    handleOpenStores,
    handleCloseCities,
    handleCloseStores,
  } = useStoreSelector();

  return (
    <Container
      maxWidth={false}
      className={styles.backgroundContainer}
    >
      <GeneralSpinner open={citiesLoading}/>

      <Container maxWidth='sm' className={styles.cardContainer}>
        <FormProvider {...methods}>
          <Card className={styles.formCard} elevation={6}>

            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <CardHeader title='Selecciona tu ciudad y sucursal' sx={{ textAlign: 'center' }} />
              <Stack spacing={2}>
                <FormAutocomplete
                  fieldName={'city'}
                  required={true}
                  fieldLabel={'Ciudad'}
                  open={citiesOpen}
                  loading={citiesLoading}
                  options={cities}
                  handleOpen={handleOpenCities}
                  handleClose={handleCloseCities}
                />

                <FormAutocomplete
                  fieldName={'store'}
                  required={true}
                  fieldLabel={'Tienda'}
                  open={storesOpen}
                  loading={storesLoading}
                  options={stores}
                  handleOpen={handleOpenStores}
                  handleClose={handleCloseStores}
                />
              </Stack>

              <CardActions sx={{ mt: 2, justifyContent: 'flex-end' }} >
                <StyledButton variant='contained' priority='primary' type='submit'>
                  Seleccionar sucursal
                </StyledButton>
              </CardActions>
            </form>
          </Card>
        </FormProvider>
      </Container>
    </Container>
  )
}

export default StoreSelector;
