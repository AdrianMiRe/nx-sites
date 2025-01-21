import { useEffect, useState } from "react";

export const useOpenpayScript = (name: "OpenPay" | "OpenPayData") => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkAvailability = () => {
      if ((window as any)[name]) {
        setIsLoaded(true);
      }
    };

    // Verificar si el script ya está disponible en el DOM
    checkAvailability();
  }, [name]);

  return { isLoaded };
};