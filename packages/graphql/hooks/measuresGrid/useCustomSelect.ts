import { MouseEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form'
import { useTheme, useMediaQuery } from '@mui/material';
import { CustomSelectProps } from '@repo/graphql/interfaces/customSelect';

export const useCustomSelect = (
  {
    eye,
    from,
    name,
    disabled,
    negativeValues,
    positiveValues,
    nextMeasure,
  } : CustomSelectProps
) => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null >(null);
    const { control, setValue } = useFormContext();
    const theme = useTheme();
    const matchesTab = useMediaQuery(theme.breakpoints.up('md'));
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
        
    const handleClick = (event: MouseEvent<HTMLElement> ) => {
        if (disabled) return;
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleChangeValue = ( nvId: string, newValue: string) => {
        if (!parseFloat(newValue)) return;
        setValue(name, newValue);
        setValue(`${eye}SphereId`, nvId)
        setAnchorEl(null);
        nextMeasure(eye, 'Sphere');
    }

    const handleMixedChangeValue = (id: string, value: string) => {
        if (!parseFloat(value)) return;
        setValue(name, value);
        setValue(`${name}Id`, id);
        setAnchorEl(null);
        nextMeasure(eye, 'Sphere');
    }
    
    return {
      id,
      eye,
      from,
      name,
      open,
      control,
      anchorEl,
      disabled,
      matchesTab,
      negativeValues,
      positiveValues,
      setValue,
      handleClick,
      nextMeasure,
      setAnchorEl,
      handleChangeValue,
      handleMixedChangeValue,
    }
}