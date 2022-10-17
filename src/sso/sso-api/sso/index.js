import Keycloak from "keycloak-js";

const keyCloack = new Keycloak({
  url: "https://account.webpipl.com",
  realm: "master-webpipl",
  clientId: "webpipl-issues",
});

const initKc = () => {};

const doLogin = keyCloack.login;

const doLogout = keyCloack.logout;

const getToken = () => keyCloack.token;

const getKc = keyCloack;

const isLoggedIn = () => !!keyCloack.token;

export { getKc, initKc, doLogin, doLogout, getToken, isLoggedIn, keyCloack };
