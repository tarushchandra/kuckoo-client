import { useCallback, useEffect, useRef, useState } from "react";

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

// export const useIntersection = (options: any = {}, listOfItems: any) => {
//   const ref = useRef<any>(null);
//   const [isIntersecting, setIsIntersecting] = useState(false);

//   console.log("ref.current -", ref.current);

//   useEffect(() => {
//     if (!ref.current) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       console.log("entry -", entry);
//       setIsIntersecting(entry.isIntersecting);
//       if (entry.isIntersecting) observer.unobserve(ref.current);
//     }, options);
//     observer.observe(ref.current);

//     return () => {
//       observer.disconnect();
//     };
//   }, [ref.current]);

//   return { ref, isIntersecting };
// };

export const useIntersection = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observe = useCallback((node: Element) => {
    if (!node) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) observerRef.current?.disconnect();
    });
    observerRef.current.observe(node);
  }, []);

  return { observe, isIntersecting };
};
