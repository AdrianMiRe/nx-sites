import { MouseEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form"

const useSupportAdvertise = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const methods = useForm({
    defaultValues: {
      isRecurrence: null,
      email: null,
      subscriptionNumber: null
    }
  });

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  },[])

  const handleClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'chat-popover': undefined;
  
  return {
    id,
    open,
    methods,
    anchorEl,
    handleClick,
    handleClose
  }
}

export default useSupportAdvertise