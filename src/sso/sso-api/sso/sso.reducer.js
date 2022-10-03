import { IDLE } from "../../constants";

const initialState = {
  initialized: false,
  authenticated: IDLE,
  token: IDLE,
  refreshToken: IDLE,
  isLoading: true,
  isTokenExpired: IDLE,
  hasRole: IDLE,
  email_verified: false,
  name: "",
  preferred_username: "",
  given_name: "",
  "client-role": IDLE,
  family_name: "",
  email: "",
};
const ssoReducer = (state = initialState, action) => {
  const { type, sso } = action;
  switch (type) {
    case "SSO_SUCCESS": {
      return {
        ...state,
        initialized: true,
        authenticated: sso.authenticated,
        token: sso.token,
        refreshToken: sso.refreshToken,
        isTokenExpired: sso.isTokenExpired,
      };
    }
    case "SET_USER_INFO":
      const { payload } = action;
      // console.log("Pauy;oad: ", payload);
      return {
        ...state,
        ...action.payload,
        "client-role": payload?.hasOwnProperty("client-role")
          ? payload?.["client-role"]
          : undefined,
      };
    default:
      return state;
  }
};

export default ssoReducer;
