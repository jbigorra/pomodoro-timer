import { useEffect, useRef } from 'react';

export function useInterval (callback, delay) {
  const savedCallback = useRef();
  savedCallback.current = callback;

  useEffect(() => {
    function tick () {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
