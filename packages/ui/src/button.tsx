"use client";

import { ReactNode } from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const StyledButton = ({ children, className, appName }: ButtonProps) => {
  return (
    <Button className={className} onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </Button>
  );
};
