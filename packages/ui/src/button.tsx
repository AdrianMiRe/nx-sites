"use client";

import { ReactNode } from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  children: ReactNode
  priority: string
  variant: string
  type?: string
  styles?: object
  icon?: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const StyledButton = ({ children, priority, variant, type, styles, icon, disabled, onClick }: ButtonProps) => {
  
  let defaultStyles = null;

  switch (variant) {
    case 'contained':
        defaultStyles = {
          borderRadius: '24px',
          backgroundColor: priority === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)',
          '&:hover': {
            backgroundColor: priority === 'primary' ? 'var(--primary-color-dark)': 'var(--secondary-color-dark)'
          }
        }
      break;
    case 'outlined':
      defaultStyles = {
        borderRadius: '24px',
        backgroundColor: '#fff',
        color: priority === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)',
        border: `2px solid ${priority === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)'}`,
        '&:hover': {
          backgroundColor: priority === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)',
          color: 'white',
          border: `2px solid ${priority === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)'}`
        }
      }
      break;
    case 'text':
      defaultStyles = {
        borderRadius: '24px',
        backgroundColor: 'transparent',
        color: priority === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)',
        '&:hover': {
          backgroundColor: 'transparent',
          textDecoration: 'underline'
        }
      }
      break;
  }
  
  return (
    <>
      {
        type === 'submit' ? (
          <Button
            type={type}
            disabled={disabled}
            variant={variant === 'contained' ? 'contained' : variant=== 'outlined' ? 'outlined' : 'text'}
            sx={{
              ...styles,
              ...defaultStyles
            }}

          >
            {children}
          </Button>
        ) : (
          <Button
            disabled={disabled}
            variant={variant === 'contained' ? 'contained' : variant=== 'outlined' ? 'outlined' : 'text'}
            onClick={onClick}
            startIcon={icon}
            sx={{
              ...styles,
              ...defaultStyles
            }}
          >
            { children }
          </Button>
        )
      }
    
    </>
  );
};
