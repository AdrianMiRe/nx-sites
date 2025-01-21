import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { PickupIcon, EditionIcon } from '@repo/ui/icons';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses
} from 'react-pro-sidebar';

import Hamburger from '../hamburger/hamburger';
import useSidebar from '@repo/graphql/hooks/sidebar/useSidebar';
import Image from 'next/image';
import { StyledButton } from '@repo/ui/button';
import { FormAutocomplete } from '@repo/ui/formAutocomplete';
import { FormProvider } from 'react-hook-form';
import { GeneralSpinner } from '@repo/ui/spinner';

const Asidebar = () => {

  const {
    id,
    open,
    cities,
    stores,
    router,
    acName,
    acStore,
    methods,
    anchorEl,
    acInitials,
    collapsed,
    citiesOpen,
    storesOpen,
    changeStore,
    citiesLoading,
    storesLoading,
    menuItemStyles,
    onSubmit,
    handleClick,
    handleClose,
    handleLogOut,
    handleCollapsed,
    handleOpenCities,
    handleOpenStores,
    handleChangeStore,
    handleCloseCities,
    handleCloseStores
  } = useSidebar();

  return (
    <Box 
      sx={{
        height: 'calc(100vh - .5rem)',
        padding: '1rem'
      }}
    >
          <Sidebar
            rootStyles={{
              borderRadius: '12px',
              height:'100%',
              [`.${sidebarClasses.container}`]:{
                backdropFilter: 'blur(5px) saturate(180%)',
                background: 'rgba(0, 90, 187, .2)',
                borderRadius: '12px',
              }
            }}
            collapsed={!collapsed}
            breakPoint='sm'
          >
            <Stack justifyContent={'space-between'} height={'100%'}>
              <Stack>
                <Stack 
                  justifyContent={'space-between'}
                  alignItems={collapsed ? '' : 'center'}
                  flexDirection={collapsed ? 'row' : 'column-reverse'}
                  mt={1}
                  mb={2}
                  px={1}
                  spacing={2}
                >
                  <Image
                    alt='lafam-logo'
                    src={collapsed ? '/sidebar/lafam_uncollapsed.webp' : '/sidebar/lafam_collapsed.webp'}
                    width={collapsed ? 180 : 46}
                    height={collapsed ? 41 : 46}
                    loading='lazy'
                    style={{
                      marginTop: collapsed ? 0 : 8
                    }}
                  />
                  <Hamburger collapsed={collapsed} setCollapsed={handleCollapsed} />
                </Stack>

                <Menu menuItemStyles={menuItemStyles}>
                  <MenuItem icon={<CottageOutlinedIcon />} onClick={() => router.push('/menu')}>Venta</MenuItem>
                  <MenuItem icon={<BarChartOutlinedIcon />} onClick={() => router.push('/menu/kpis')}>KPI'S</MenuItem>
                  <MenuItem icon={<InsertLinkIcon />} onClick={() => router.push('/menu/resend')}>Reenvío</MenuItem>
                  <MenuItem icon={<PickupIcon />} onClick={() => router.push('/menu/pickup')}>Entrega en Tienda</MenuItem>
                  <SubMenu icon={<ReceiptOutlinedIcon />} label='Reportes PVC'>
                    <MenuItem onClick={() => router.push('/menu/pvc-reports/order')}>Ordenes</MenuItem>
                    <MenuItem onClick={() => router.push('/menu/pvc-reports/preorder')}>Preordenes</MenuItem>
                    <MenuItem onClick={() => router.push('/menu/pvc-reports/recurrence')}>Recurrencias</MenuItem>
                    <MenuItem onClick={() => router.push('/menu/pvc-reports/errors')}>Errores ERP</MenuItem>
                  </SubMenu>
                  <SubMenu icon={<BallotOutlinedIcon />} label='Suscripciones'>
                    <MenuItem icon={<EditionIcon />} onClick={() => router.push('/menu/sub-editor/list')}>Edición</MenuItem>
                    <MenuItem icon={<PauseCircleOutlineIcon />} onClick={() => router.push('/menu/pause/list')}>Pausar</MenuItem>
                    <MenuItem icon={<EditCalendarOutlinedIcon />} onClick={() => router.push('/menu/extend-delivery/list')}>Cambiar Entrega</MenuItem>
                    <MenuItem icon={<EventBusyOutlinedIcon />} onClick={() => router.push('/menu/cancellation/list')}>Cancelar</MenuItem>
                  </SubMenu>
                  <SubMenu icon={<DescriptionOutlinedIcon />} label='Reportes'>
                    <MenuItem onClick={() => router.push('/menu/reports/subscriptions')}>Creación</MenuItem>
                    <MenuItem onClick={() => router.push('/menu/reports/historic')}>Historico</MenuItem>
                    <MenuItem onClick={() => router.push('/menu/reports/stats')}>Suscripciones y Recurrencias</MenuItem>
                  </SubMenu>
                </Menu>
              </Stack>

              <Stack>
                {
                  collapsed ? ( 
                    <Button
                      aria-describedby={id}
                      variant={'text'}
                      onClick={handleClick}
                      sx={{ justifyContent: 'space-around'}}
                      startIcon={<Avatar sx={{ backgroundColor: 'var(--primary-color)' }} >{acInitials}</Avatar>}
                      endIcon={<MoreVertIcon />}
                    >
                      <Stack spacing={0}>
                        <Typography variant='body2'>{acName}</Typography>
                        <Typography variant='body2'>{acStore}</Typography>
                      </Stack>
                    </Button>
                    ) : (
                      <IconButton
                        aria-describedby={id}
                        onClick={handleClick}
                      >
                        <Avatar sx={{ backgroundColor: 'var(--primary-color)' }} >{acInitials}</Avatar>
                      </IconButton>
                    )
                }
                <Popover 
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        borderRadius: '12px'
                      }
                    }
                  }}
                >
                  <Card sx={{ p: 2, borderRadius: '12px' }}>
                    
                    {
                      changeStore ?
                      <>
                        <GeneralSpinner open={citiesLoading || storesLoading}/>

                        <FormProvider {...methods}>
                          <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Stack spacing={1}>
                              <Typography variant='h6'>Selecciona tu ciudad y sucursal</Typography>
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

                              <StyledButton
                                priority='primary'
                                variant='contained'
                                type='submit'
                              >
                                Cambiar Sucursal
                              </StyledButton>

                              <StyledButton
                                priority='primary'
                                variant='outlined'
                                onClick={handleChangeStore}
                              >
                                Regresar
                              </StyledButton>
                            </Stack>
                          </form>
                        </FormProvider>
                      </>
                      :
                      <StyledButton
                        priority='primary'
                        variant='outlined'
                        onClick={handleChangeStore}
                      >
                        Cambiar Sucursal
                      </StyledButton>
                    }
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                      <StyledButton
                        priority='primary'
                        variant='outlined'
                        icon={<LogoutRoundedIcon/>}
                        onClick={handleLogOut}
                      >
                        Cerrar Sesión
                      </StyledButton>
                    </CardActions>
                  
                  </Card>
                </Popover>
              </Stack>
            </Stack>

          </Sidebar>
        </Box>
  )
}

export default Asidebar