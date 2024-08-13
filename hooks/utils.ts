import { useRef } from "react";

export const debounce = (func: () => void, delay: number) => {
  let timeout: any;

  return () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func();
      timeout = null;
    }, delay);
  };
};

export const useDebounce = (func: () => void, delay: number) => {
  let timeoutRef = useRef<any>(null);

  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      func();
      timeoutRef.current = null;
    }, delay);
  };
};

export const useThrottle = (func: () => void, delay: number) => {
  let isTimeoutPresentRef = useRef(false);

  return () => {
    if (isTimeoutPresentRef.current) return;

    func();
    setTimeout(() => {
      isTimeoutPresentRef.current = false;
    }, delay);
    isTimeoutPresentRef.current = true;
  };
};
