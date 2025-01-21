'use client'

import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";

interface FormInputProps {
  fieldName: string,
  required: boolean,
  fieldLabel: string,
  isPassword: boolean,
  type: string,
  handleVisibility?: () => void
}

export const FormInput = ({ fieldName, required, fieldLabel, isPassword, type, handleVisibility } : FormInputProps ) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControl
          { ...field }
          required={required}
        >

          <Typography component={'label'} htmlFor={fieldName}>{ fieldLabel }</Typography>

          <OutlinedInput
            { ...field }
            id={fieldName}
            type={ type }
            size='small'
            endAdornment={
              isPassword && (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle-pass-visibility'
                    onClick={handleVisibility}
                    edge='end'
                  >
                    {
                      type === 'password' ? (
                        <Visibility />
                      ): (
                        <VisibilityOff />
                      )
                    }

                  </IconButton>
                </InputAdornment>
              )
            }
            sx={{
              borderRadius: '24px',
              backgroundColor: 'var(--input-background)',
              boxShadow: 'inset 8px 8px 8px #cbced1, inset -8px -8px 8px #efefef',
              '& > fieldset': {
                border: 'none'
              }
            }}
          />

        </FormControl>

      )}
    />
  )

}