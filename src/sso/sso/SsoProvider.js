import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import { IDLE } from "../constants";
import { keyCloack } from "../sso-api/sso";

const initialState = {
  initialized: false,
  authenticated: IDLE,
  token: IDLE,
  refreshToken: IDLE,
  isLoading: true,
  isTokenExpired: IDLE,
  hasRole: IDLE,
};
const SsoContext = createContext(initialState);

export const useSso = () => useContext(SsoContext);

const SsoProvider = ({ children, client = keyCloack }) => {
  /*eslint-disable no-unused-vars*/
  const [authentication, setAuthetication] = useState(initialState);
  useEffect(() => {
    new Promise((resolve, _) => {
      let newJ = client
        .init({
          onLoad: "login-required",
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
          pkceMethod: "S256",
        })
        .then(() => {});
      resolve(newJ);
    })
      .then(async () => {
        setAuthetication((prev) => ({
          ...prev,
          authenticated: client.authenticated,
          isTokenExpired: client.isTokenExpired,
          refreshToken: client.refreshToken,
          token: client.token,

          sso: client,
        }));
        // dispatch({
        //   type: "SSO_SUCCESS",
        //   sso: client,
        // });
        // dispatch({
        //   payload: await client.loadUserInfo(),
        //   type: "SET_USER_INFO",
        // });
      })
      .catch((error) => {
        console.log("Error:Authentication: ", error);
      });

    /*eslint-disable react-hooks/exhaustive-deps */
  }, [client]);

  const hasRole = useMemo(() => {
    return authentication.hasRole;
  }, [authentication]);

  return (
    <SsoContext.Provider
      value={{
        ...authentication,
        sso: client,
        hasRole: hasRole,
        handleLogout: client.logout,
      }}
    >
      {children}
    </SsoContext.Provider>
  );
};

export default SsoProvider;
