"use client"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Asidebar from '../../(components)/sidebar/sidebar';
import useFullPage from '../../hooks/useFullPage';
import IdleModal from '@repo/ui/idleModal';
import SupportAdvertise from '../../(components)/supportAdvertise/supportAdvertise';
import BottomNav from '../../(components)/bottomNav/bottomNav';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {

  const {
    body,
    isIdle,
    matchesSm,
    showModal,
    handleSignOut,
    handleStayLoggedIn
  } = useFullPage();

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        {
          matchesSm &&
          <Grid size={'auto'} sx={{ position: 'sticky', top: 0, height: '100vh' }}>
            <Asidebar />
          </Grid>
        }
        
        {
          !matchesSm &&
          <BottomNav/>
        }

        <Grid size={'grow'} sx={{ height: '100%', overflowY: 'auto' }} >
          <section>
            {children}
            <SupportAdvertise upMobile={matchesSm} />
            {
              isIdle &&
                <IdleModal
                  open={showModal}
                  title='Su tiempo de sesión está por expirar'
                  body={body}
                  primaryLabel='Si, permanecer conectado'
                  primaryAction={handleStayLoggedIn}
                  secondaryLabel='No, salir de la sesión'
                  secondaryAction={handleSignOut}

                />
            }
          </section>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Layout;