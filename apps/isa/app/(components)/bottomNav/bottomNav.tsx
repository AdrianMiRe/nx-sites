import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/navigation";

import InsertLinkIcon from '@mui/icons-material/InsertLink';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const BottomNav = () => {

  const [value, setValue] = useState(0);
  const router = useRouter();

  return (
    <BottomNavigation
      sx={{
        width: 'calc(100% - 1rem)',
        position: 'absolute',
        bottom: '8px',
        marginLeft: '.5rem',
        borderRadius: '25px'
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    >
      <BottomNavigationAction
        sx={{
          '&.Mui-selected': {
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
            color: 'snow',
            backgroundColor: "var(--primary-color)"
          }
        }}
        label='Reenvio'
        icon={<InsertLinkIcon />}
        onClick={() => router.push('/menu/resend')}
      />
      <BottomNavigationAction
        sx={{
          '&.Mui-selected': {
            color: 'snow',
            backgroundColor: "var(--primary-color)"
          }
        }}
        label='Subscripciones'
        icon={<BallotOutlinedIcon />}
        onClick={() => router.push('/menu/kpis')}
      />
      <BottomNavigationAction
        sx={{
          '&.Mui-selected': {
            color: 'snow',
            backgroundColor: "var(--primary-color)"
          }
        }}
        label='Venta'
        icon={<CottageOutlinedIcon />}
        onClick={() => router.push('/menu')}
      />
      <BottomNavigationAction
        sx={{
          '&.Mui-selected': {
            color: 'snow',
            backgroundColor: "var(--primary-color)"
          }
        }}
        label='Pickup'
        icon={<StoreMallDirectoryOutlinedIcon />}
        onClick={() => router.push('/menu/pickup')}
      />
      <BottomNavigationAction
        sx={{
          '&.Mui-selected': {
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px',
            color: 'snow',
            backgroundColor: "var(--primary-color)"
          }
        }}
        label='Reportes'
        icon={<DescriptionOutlinedIcon />}
        onClick={() => router.push('/menu/kpis')}
      />
    </BottomNavigation>
  )
}

export default BottomNav