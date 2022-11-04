import { createContext, useContext, useState, useMemo } from "react";

const ErrorContext = createContext({
  error: null,
  setError: () => {},
});

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState();
  const value = useMemo(() => ({ error, setError }), [error]);
  return (
    // <ErrorContext.Provider value={{ error, setError }}>
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);
