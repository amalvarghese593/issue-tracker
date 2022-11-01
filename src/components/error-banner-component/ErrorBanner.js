import React from "react";
import { useErrorContext } from "../../data-store/error-context";
import "./index.css";

export const ErrorBanner = ({ msg }) => {
  const { setError } = useErrorContext();
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(null);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="err-bnr-cntr">
      <span>{msg}</span>
    </div>
  );
};
