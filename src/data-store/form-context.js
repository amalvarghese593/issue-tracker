import { createContext, useContext } from "react";

export const FormContext = createContext({
  formik: {},
});

export const useFormContext = () => useContext(FormContext);
