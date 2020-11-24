import { createContext } from "react";

export const AuthContext = createContext({
  isAuthentication: false,
  token: null,
  loginContext: () => {},
  logout: () => {},
});
