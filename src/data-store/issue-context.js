import { useContext, createContext } from "react";
import { useSso } from "../sso/sso/SsoProvider";
import { IDLE } from "../sso/constants";
import { useApicall } from "../hooks/useApicall";

const IssuesContext = createContext({
  data: [],
  setData: () => {},
});
export const IssuesProvider = ({ children }) => {
  const { token } = useSso();
  const callFetch = (fetch) => {
    if (token && token !== IDLE) fetch();
  };
  const { data, setData } = useApicall({
    path: "/api/v1/auth/issueTracker",
    method: "get",
    token,
    getResponse: (o) => o.data.result,
    dependancies: [token],
    callFetch,
  });
  return (
    <IssuesContext.Provider value={{ data, setData }}>
      {children}
    </IssuesContext.Provider>
  );
};
export const useIssuesData = () => useContext(IssuesContext);
