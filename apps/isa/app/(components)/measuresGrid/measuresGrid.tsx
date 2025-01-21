import { Controller } from 'react-hook-form';
import { useMeasuresGrid } from '@repo/graphql/hooks/measuresGrid/useMeasuresGrid'

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CustomSelect } from '../customSelect/customSelect';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { GeneralSpinner } from '@repo/ui/spinner';
import GridSame from './gridSame';

import { MeasuresProps } from '@repo/graphql/interfaces/measuresGrid'


export const MeasuresGrid = (props: MeasuresProps) => {

  const {
    saleType
  } = props;

  const {
    fields,
    oneEye,
    control,
    loading,
    fieldsData,
    getValues,
    handleAdd,
    nextMeasure,
    handleChange,
    // handleOneEye,
    handleRemove
  } = useMeasuresGrid(props);

  return (
    <Box component='div' sx={{ position: 'relative' }}>

      <GeneralSpinner
        open={loading}
      />
      
      <Stack spacing={1.5}>

        {
          saleType ===  'same' &&
           <GridSame
            fields={fields}
            fieldsData={fieldsData}
            handleChange={handleChange}
            nextMeasure={nextMeasure}
           />
        }

        {/* Grilla de sku */}
        <Grid container>
          {
            saleType !== 'diff' && 
            <Grid size={2} />
          }
          
          <Grid size={4} sx={{ alignSelf: 'center' }}>
            <Typography variant='subtitle2'>SKU</Typography>
          </Grid>

          <Grid size={4} sx={{ alignSelf: 'center' }}>
            <Typography variant='body2' textAlign='center' >{getValues('rightSku')}</Typography>
          </Grid>

          {
            saleType === 'diff' && (
              <Grid size={4} sx={{ alignSelf: 'center' }}>
                <Typography variant='body2' textAlign='center'>{getValues('leftSku')}</Typography>
              </Grid>
            )
          }
        </Grid>

        {/* Grilla de cantidad */}
        <Grid container>

          {
            saleType!== 'diff' && 
            <Grid size={2} />
          }
          
          <Grid size={4} sx={{ alignSelf: 'center'}}>
            <Typography variant='subtitle2'>Cantidad</Typography>
          </Grid>

          <Grid size={4} px={1}>
            <Controller
              name={ 'rightQuantity' }
              control={ control }
              render={ ({ field }) => 
                <TextField
                  { ...field }
                  fullWidth
                  size='small'
                  variant='outlined'
                  name='rightQty'
                  // value={rightQty}
                  InputProps={{
                    readOnly: true,
                    sx:[{
                      paddingRight: 0,
                      paddingLeft: 0,
                      height: '2rem',
                      borderRadius: '25px'
                    }, {
                      '& > input': {
                        textAlign: 'center'
                      }
                    }, {
                      '& > fieldset': {
                        border: '0'
                      }
                    }],  
                    startAdornment:
                      <InputAdornment position='start'>
                        <IconButton
                          onClick={() => {
                            handleRemove('right')
                          }}
                          sx={[
                            {
                              p: 0 
                            },
                            {
                              '&:hover': {
                                backgroundColor: 'white'
                              }
                            }, {
                              '&:focus': {
                                backgroundColor: 'white'
                              }
                            }
                          ]}
                        >
                          <RemoveCircleOutlineIcon sx={{ color: 'var(--secondary-color)' }} />
                        </IconButton>
                      </InputAdornment>,
                    endAdornment:
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => {
                            handleAdd('right')
                          }}
                          sx={[
                            {
                              p: 0
                            },
                            {
                              '&:hover': {
                                backgroundColor: 'white'
                              }
                            }, {
                              '&:focus': {
                                backgroundColor: 'white'
                              }
                            }
                          ]}
                        >
                          <AddCircleOutlineIcon sx={{ color: 'var(--primary-color)' }} />
                        </IconButton>
                      </InputAdornment> 
                  }}
                />
              }
            />
          </Grid>

          {
            saleType === 'diff' &&
            <Grid size={4} px={1}>
              <Controller
                name={ 'leftQuantity' }
                control={ control }
                render={ ({ field }) => 
                  <TextField
                    { ...field }
                    fullWidth
                    size='small'
                    variant='outlined'
                    name='leftQuantity'
                    // value={leftQty}
                    InputProps={{
                      readOnly: true,
                      sx:[{
                        paddingRight: 0,
                        paddingLeft: 0,
                        height: '2rem',
                        borderRadius: '25px'
                      }, {
                        '& > input': {
                          textAlign: 'center'
                        }
                      }, {
                        '& > fieldset': {
                          border: '0'
                        }
                      }],
                      startAdornment:
                        <InputAdornment position='start'>
                          <IconButton
                            onClick={() => {
                              handleRemove('left')
                            }}
                            sx={[
                              {
                                p: 0
                              },
                              {
                                '&:hover': {
                                  backgroundColor: 'white'
                                }
                              }, {
                                '&:focus': {
                                  backgroundColor: 'white'
                                }
                              }
                            ]}
                          >
                            <RemoveCircleOutlineIcon sx={{ color: 'var(--secondary-color)' }} />
                          </IconButton>
                        </InputAdornment>,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => {
                              handleAdd('left')
                            }}
                            sx={[
                              {
                                p: 0,
                              },
                              {
                                '&:hover': {
                                  backgroundColor: 'white'
                                }
                              }, {
                                '&:focus': {
                                  backgroundColor: 'white'
                                }
                              }
                            ]}
                          >
                            <AddCircleOutlineIcon sx={{ color: 'var(--primary-color)' }} />
                          </IconButton>
                        </InputAdornment> 
                    }}
                  />
                }
              />
            </Grid>
          }

        </Grid>

      </Stack>

    </Box>
  )
}
