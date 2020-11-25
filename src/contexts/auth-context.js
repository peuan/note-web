import { createContext } from "react";

export const AuthContext = createContext({
  isAuthentication: false,
  user: {},
  loginContext: (user) => {},
  logout: () => {},
});
