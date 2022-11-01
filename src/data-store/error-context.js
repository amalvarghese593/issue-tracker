import { createContext, useContext, useState } from "react";

const ErrorContext = createContext({
  error: null,
  setError: () => {},
});

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState();
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);
