
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { Controller } from 'react-hook-form'
import { useCustomSelect } from '@repo/graphql/hooks/measuresGrid/useCustomSelect';
import { CustomSelectProps } from '@repo/graphql/interfaces/customSelect';

export const CustomSelect = (props : CustomSelectProps) => {
  const {
    id,
    from,
    name, 
    open,
    control,
    anchorEl,
    disabled,
    matchesTab,
    negativeValues, 
    positiveValues,
    handleClick,
    handleChangeValue,
    handleMixedChangeValue,
  } = useCustomSelect(props);

  return (
   <>
    <Controller
      name={ name }
      control={ control }
      render={ ({ field }) => 
        <TextField
          { ...field }
          disabled={disabled}
          autoComplete='off'
          name={name}
          // value={ formik.values[name] }
          onClick={ handleClick }
          size='small'
          slotProps={{
            input:{
              readOnly: true,
              className: 'customSelect',
              sx: {
                '& > input' : {
                  textAlign: 'center',
                  cursor: 'pointer'
                }
              },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    disabled={ disabled }
                    sx={[
                      {
                        p: 0,
                        ml : matchesTab ? '2rem': '0'
                      },
                      {
                        '&:hover': {
                          backgroundColor: 'white'
                        }
                      }, {
                        '&:focus': {
                          backgroundColor: 'white',
                          ml: '0'
                        }
                      }
                    ]}
                  >
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon className={ `MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-hfutr2-MuiSvgIcon-root-MuiSelect-icon ${ disabled ? 'Mui-disabled' :  null }`} /> }
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
      }
    />

    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      sx={{ width: '100px' }}
      placement='bottom'
      transition
      keepMounted
    >
      {({ TransitionProps }) => (
        <Collapse
          {...TransitionProps}
          timeout={600}
          in={open}
        >
          <Paper
            elevation={2}
            sx={{
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              height: '200px',
              overflowY: 'auto'
            }}
          >
            <Grid
              container
              sx={{
                background: 'white',
                padding: 1,
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                // overflowY: 'scroll',
                height: '100%'
              }}>
              
              <Grid size={{ lg: 5 }}>
                <Stack sx={{
                  flexWrap: 'wrap',
                  alignContent: 'center',
                  alignItems: 'center'
                }}>
                  {
                    Array.isArray(negativeValues) && negativeValues.map( neg => {
                      return (
                        <Typography
                          key={neg.id}
                          sx={[{
                            color: 'var(--secondary-color)',
                            textAlign: 'center',
                            fontSize: '.85rem',
                            width: '100%',
                            cursor:  parseFloat(neg.value) ? 'pointer': 'default'
                          },{
                            '&:hover': {
                              backgroundColor: '#e3e3e3 !important'
                            }
                          }]}
                          onClick={ () => {
                            if (from === 'mixed')
                              handleMixedChangeValue(neg.id, neg.value)
                            else
                              handleChangeValue(neg.id, neg.value)
                          }}  
                        >{neg.value}</Typography>
                      )
                    })
                  }
                </Stack>
              </Grid>

              <Grid size={{ lg: 2 }} justifyContent={'center'}>
                <Divider orientation='vertical' />
              </Grid>

              <Grid size={{ lg: 5 }}>
                <Stack sx={{
                  flexWrap: 'wrap',
                  alignContent: 'center',
                  alignItems: 'center'
                }}>
                  {
                    Array.isArray(positiveValues) && positiveValues.map(pos => {
                      return (
                        <Typography 
                          key={pos.id}
                          sx={[
                          {
                            color: 'var(--primary-color)',
                            textAlign: 'center',
                            fontSize: '.85rem',
                            width: '100%',
                            cursor:  parseFloat(pos.value) ? 'pointer': 'default'
                          },{
                            '&:hover': {
                              backgroundColor: '#e3e3e3 !important'
                            }
                          }]}
                        onClick={ () => {
                          if(from === 'mixed')
                            handleMixedChangeValue(pos.id, pos.value)
                          else
                            handleChangeValue(pos.id, pos.value)
                        }}
                        >{pos.value}</Typography>
                      )
                    })
                  }
                </Stack>
              </Grid>

            </Grid>
            
          </Paper>
        </Collapse>
      )}
    </Popper>  
   </>
  )
}
