import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";

interface IdleProps {
  onIdle: () => void
  idleTime: number
}

const useIdle = ({ onIdle, idleTime }: IdleProps) => {
  const [isIdle, setIsIdle] = useState<boolean>(false);

  const handleOnIdle = () => {
    setIsIdle(true);

    onIdle();
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * idleTime,
    onIdle: handleOnIdle,
    debounce: 500
  });

  return {
    getRemainingTime,
    getLastActiveTime,
    isIdle
  }
}

export default useIdle;