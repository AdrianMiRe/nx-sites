
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import numberFormatter from '../../utils/numberFormatter';
import styles from '../../styles/autocomplete-opt.module.css';

const AutocompleteOption = ({ props, option}: {props: any, option: any}) => {

  return (
    <Box 
      component="li"
      sx={{ 
        '& > img': 
          { mr: 2, flexShrink: 0 }
      }}
      aria-disabled={props['aria-disabled']}
      aria-selected={props['aria-selected']}
      className={props.className}
      id={props.id}
      key={props.key}
      onClick={props.onClick}
      onMouseMove={props.onMouseMove}
      onTouchStart={props.onTouchStart}
    >
      <Stack direction='row' spacing={2} className={styles['autocomplete-option-li']}>
        <img
          loading="lazy"
          width="64"
          src={option.image}
          alt={option.label}
          className={styles['remove-bg']}
        />
        <Typography variant='subtitle1' className={styles['text-center']}>{option.label}</Typography> 
        <Box className={styles['content-center']}>
          <Typography variant='caption' className={styles['original-price']}>{numberFormatter(option.originalPrice.value)}</Typography>
          <Box component='div' className={'price-tag'}>
            <Typography variant='body2' sx={{ fontSize: '.875rem' }}>{numberFormatter(option.finalPrice.value)}</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}


export default AutocompleteOption;