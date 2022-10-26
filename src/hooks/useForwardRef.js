import { useRef, useEffect } from "react";

export const useForwardRef = (ref) => {
  const innerRef = useRef(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
      // innerRef.current = ref.current;
    }
  }, []);
  return innerRef;
};
