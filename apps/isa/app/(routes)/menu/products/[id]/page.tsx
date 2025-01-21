'use client';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { Controller, FormProvider } from 'react-hook-form';
import { EmblaOptionsType } from 'embla-carousel';

import { TabPanel } from '../../../../(components)/tabPanel/tabPanel';
import { MeasuresGrid } from '../../../../(components)/measuresGrid/measuresGrid';
import PageTitle from '../../../../(components)/pageTitle/pageTitle';
import Carousel from '../../../../(components)/carousel/carousel';

import { GeneralSpinner } from '@repo/ui/spinner';
import { StyledButton } from '@repo/ui/button';
import { Frequencies } from '@repo/graphql/interfaces/frequencies';
import usePdp from '@repo/graphql/hooks/pdp/usePdp';

import numberFormatter from '../../../../utils/numberFormatter';
import Image from 'next/image';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const ProductDetailPage = ({ params }: { params: { id: string } }) => {

  const pid = params.id;
  const OPTIONS: EmblaOptionsType = {};
  
  const {
    tab,
    maxQty,
    minQty,
    methods,
    product,
    openFreq,
    saleType,
    naMessage,
    naProduct,
    frequencies,
    searchingInv,
    searchingProd,
    searchingFreq,
    storeDisabled,
    storeHelperText,
    warehouseHelperText,
    handleBack,
    handleOpenFreq,
    handleSaleType,
    handleQtyChange,
    handleTabChange,
    handleSetFields,
    handleOpenQuote,
    handleToCheckout,
    handleRadioChange,
    handleSearchInventory,
  } = usePdp(pid)

  return (
    <FormProvider {...methods}>
      <Box component='div'>
        <GeneralSpinner open={searchingProd} />
        <PageTitle title='Detalle de producto' handleClick={() => handleBack()} />

        <Container
          maxWidth={'xl'}
          fixed
          sx={{
            p: '0 !important',
            mt: 1
          }}
        >
          {
            product &&
              <form>
                <Grid container>
                  <Grid
                    size={{
                      xs: 12,
                      sm: 12,
                      md: 4
                    }}
                    p={2}
                  >
                    <Stack spacing={2}>
                      <Carousel slides={product.images} options={OPTIONS} />

                      <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="standard"
                        aria-label="full width tabs example"
                        sx={{
                          mt: 2
                        }}
                      >
                        <Tab sx={{ fontSize: '.8rem' }} label="Detalles" {...a11yProps(0)} />
                        <Tab sx={{ fontSize: '.8rem' }} label="Más Información" {...a11yProps(1)} />
                      </Tabs>

                      <TabPanel value={tab} index={0}>
                        <div style={{ fontSize: '.75rem' }} className="post__content" dangerouslySetInnerHTML={{__html: product.descripcion }}></div>
                      </TabPanel>

                      <TabPanel value={tab} index={1}>
                        <Stack spacing={.5}>

                          {
                            product.attributes.map( attribute => {
                              if (attribute.label === 'Add' ||
                                  attribute.label === 'Cilindro' ||
                                  attribute.label === 'Curva Base' ||
                                  attribute.label === 'Diámetro' ||
                                  attribute.label === 'Eje' ||
                                  attribute.label === 'Esfera' ||
                                  attribute.label === 'Poder' ||
                                  attribute.label === 'Tiempo de entrega estimado' ||
                                  attribute.label === 'Uso' ||
                                  attribute.label === 'Reemplazo'
                              ) return null;

                              return (
                                <Stack key={attribute.label} direction='row' sx={{ justifyContent: 'space-between'}}>
                                  <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>{attribute.label}:</Typography>
                                  <Typography variant='body2'>{ attribute.value }</Typography>
                                </Stack>
                              )
                            })
                          }

                        </Stack>
                      </TabPanel>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs:12, sm:12, md:5, lg:5 }} p={2}>
                    <Stack spacing={2}>

                      <Paper elevation={6} sx={{ borderRadius: '10px', px: {xs: 2, sm: 2, tablet: 5, md: 2, lg: 2}, py: 1 }}>
                        <FormGroup>
                          <Stack spacing={1}>

                            <Typography variant='subtitle1' textAlign={'center'}>Selecciona el tipo de venta:</Typography>

                            <ToggleButtonGroup
                              size='small'
                              color="primary"
                              value={ saleType }
                              exclusive
                              onChange={ handleSaleType }
                              aria-label="Sale Type"
                              sx={{
                                justifyContent: 'center'
                              }}
                            >
                              <ToggleButton
                                value="diff"
                                sx={{
                                  fontSize: '.65rem',
                                  width: '33%',
                                  lineHeight: '1.2',
                                  borderTopLeftRadius: '15px',
                                  borderBottomLeftRadius: '15px',
                                  padding: '4px 8px !important',
                                  "&.Mui-selected": {
                                    border: '1px solid var(--primary-color-light) !important'
                                  }
                                }}
                              >Diferente Fórmula</ToggleButton>
                              <ToggleButton
                                value="same"
                                sx={{
                                  fontSize: '.65rem',
                                  width: '33%',
                                  lineHeight: '1.2',
                                  padding: '4px 8px !important',
                                  "&.Mui-selected": {
                                    border: '1px solid var(--primary-color-light) !important'
                                  }
                                }}
                              >Misma Fórmula</ToggleButton>
                              <ToggleButton
                                value="one"
                                sx={{
                                  fontSize: '.65rem',
                                  width: '33%',
                                  lineHeight: '1.2',
                                  borderTopRightRadius: '15px',
                                  borderBottomRightRadius: '15px',
                                  padding: '4px 8px !important',
                                  "&.Mui-selected": {
                                    border: '1px solid var(--primary-color-light) !important'
                                  }
                                }}
                              >Un ojo</ToggleButton>
                            </ToggleButtonGroup>

                            <Divider />

                            <MeasuresGrid
                              handleQtyChange={handleQtyChange}
                              searchInventory={handleSearchInventory}
                              saleType={saleType}
                              setParentFields={handleSetFields}
                              product={ product }
                              minQty={minQty}
                              maxQty={maxQty}
                            />

                          </Stack>

                        </FormGroup>
                      </Paper>

                      <Paper elevation={6} sx={{ borderRadius: '10px', py: 1, px: 3 }}>
                        <Typography variant="subtitle2">
                          Selecciona la frecuencia de envío:
                        </Typography>
                        <Controller
                          name={ 'frequency' }
                          control={ methods.control }
                          render={ ({ field }) =>
                            <FormControl
                              variant="outlined"
                              size="small"
                              fullWidth
                              sx={{
                                display: 'flex',
                                justifyContent: 'start'
                              }}
                            >

                              <Select
                                onClose={handleOpenFreq}
                                onOpen={handleOpenFreq}
                                { ...field }
                                sx={[
                                  {
                                    mt: 1,
                                    borderRadius: openFreq ? '20px 20px 0 0': '25px',
                                    transition: 'border-radius 0.2s linear'
                                  }, {
                                    '& > div': {
                                      display: 'flex',
                                      justifyContent: 'space-between'
                                    }
                                  }
                                ]}
                              >
                                {
                                  frequencies.map( (frequency: Frequencies) => {
                                    const label = frequency.label.split('-');
                                    return (
                                      <MenuItem key={frequency.frecuency} value={frequency.frecuency} sx={{ justifyContent: 'space-between'}} >
                                        <Typography sx={{ textAlign: 'start', textTransform: 'capitalize' }}>{ label[0] }</Typography>
                                        {/* <Typography sx={{ textAlign: 'end', textTransform: 'capitalize' }}>{ label[1] }</Typography> */}
                                      </MenuItem>
                                    )
                                  })
                                }
                              </Select>

                            </FormControl>
                          }
                        />

                      </Paper>

                    </Stack>
                  </Grid>

                  <Grid size={{
                    xs:12,
                    sm:12,
                    md: 3,
                    lg:3  
                  }}
                  p={2} >
                    <Stack spacing={2} sx={{ position: 'fixed' }}>

                      <Paper elevation={6} sx={{ borderRadius: '10px', py: 1, px: 1 }}>
                        <Stack spacing={.5}>
                          <Typography variant="caption">{ product.marca }</Typography>
                          <Typography variant="h5">
                            { product.name }
                          </Typography>

                          <Stack>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: 'var(--primary-color-400)',
                                textAlign: 'end',
                                fontWeight: '400',
                                fontSize: '1.2rem',
                                textDecoration: 'line-through 2px var(--primary-color-100)'
                              }}
                            >
                              {
                                numberFormatter(product.originalPrice.value)
                              }                              
                            </Typography>

                            <Typography
                              variant="h5"
                              sx={{
                                color: 'var(--button-primary)',
                                textAlign: 'end',
                                fontWeight: '700'
                              }}
                            >
                              {
                                numberFormatter(product.finalPrice.value)
                              }

                            </Typography>

                            <Stack direction='row' width='100%' justifyContent='space-between'>
                              <Typography variant='h6' fontWeight='700'>Cajas:</Typography>
                              <Typography variant='h6' fontWeight='700'>{ methods.watch('rightQuantity') + methods.watch('leftQuantity') }</Typography>
                            </Stack>

                          </Stack>


                          <Stack>
                            <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
                              <Typography variant='h6' fontWeight='700'>Total:</Typography>
                              <Typography variant='h6'>
                                {
                                  numberFormatter(( methods.watch('rightQuantity') + methods.watch('leftQuantity') ) * product.finalPrice.value)
                                }
                              </Typography>
                            </Stack>

                            <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
                              <Typography variant='subtitle1' fontWeight='700'>A pagar cada:</Typography>
                              <Typography variant='subtitle1' fontWeight='700'>
                                { parseInt(methods.watch('frequency')) > 0 ? `${ methods.watch('frequency') } mes(es)` : '' }
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            spacing={2}
                            // sx={{ justifyContent: 'space-evenly' }}
                          >
                            <StyledButton
                              priority='primary'
                              disabled={(methods.getValues('deliver') === '' || methods.getValues('frequency') === '' || naProduct) ? true : false}
                              variant='contained'
                              onClick={handleToCheckout}
                            >
                              Comprar
                            </StyledButton>
                            
                            <StyledButton
                              priority='secondary'
                              variant="outlined"
                              disabled={(methods.getValues('deliver') === '' || methods.getValues('frequency') === '' || naProduct) ? true : false}
                              onClick={handleOpenQuote}
                            >
                              Cotizar
                            </StyledButton>

                          </Stack>
                        </Stack>
                      </Paper>

                      <Paper
                        className={`deliveryType ${methods.getValues('deliver')}`}
                        elevation={6}
                        sx={{ borderRadius: '10px', py: 1, px: 3 }}
                      >
                        <Typography variant="subtitle2">
                          Selecciona el método de la primer entrega:
                        </Typography>

                        <Stack direction='row' justifyContent='space-between'>
                          <FormControl sx={{ m: 1 }} variant="filled">
                            <Controller
                              control={ methods.control }
                              name='deliver'
                              render={ ({ field }) =>
                                <RadioGroup
                                  { ...field }
                                  aria-labelledby="demo-error-radios"
                                  name="deliver"
                                  id="deliver"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleRadioChange(e);
                                  }}
                                >
                                  <FormControlLabel disabled={storeDisabled} value="store" control={<Radio />} label={<Typography variant="caption">Entrega en tienda</Typography>} />
                                    <FormHelperText>{storeHelperText}</FormHelperText>
                                  <FormControlLabel value="home" control={<Radio />} label={<Typography variant="caption">Entrega a domicilio</Typography>} />
                                    <FormHelperText>{warehouseHelperText}</FormHelperText>
                                </RadioGroup>
                              }
                            />

                          </FormControl>

                          <Box sx={{display: 'flex', alignSelf: 'center'}}>
                            <Image
                              src={'/pdp/fd.png'}
                              alt='first-delivery'
                              width={72}
                              height={72}
                            />

                          </Box>
                        </Stack>

                      </Paper>

                    </Stack>
                  </Grid>

                </Grid>
              </form>
          }

        </Container>

      </Box>
    </FormProvider>
  )
}

export default ProductDetailPage;