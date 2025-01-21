'use client'

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';

import { Controller, useFormContext } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

interface FormAutocompleteProps {
  fieldName: string,
  required: boolean,
  fieldLabel: string,
  open: boolean,
  loading: boolean,
  options: any,
  handleOpen: () => void,
  handleClose: () => void
}

export const FormAutocomplete = ({
  fieldName,
  required,
  fieldLabel,
  open,
  loading,
  options,
  handleOpen,
  handleClose
} : FormAutocompleteProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControl
          required={required}
          sx={{ width: '100%' }}
        >
          <Typography mb={1} component={'label'} htmlFor={fieldName}>{ fieldLabel }</Typography>

          <Autocomplete
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option.id === value}
            getOptionLabel={(option) => option.label || '' }
            options={options}
            loading={true}
            size='small'
            {...field}
            onChange={(e,n) => {
              field.onChange(n)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    sx: {
                      width: '100%',
                      borderRadius: '25px'
                    },
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />
        </FormControl>
      )}
    />
  )
}