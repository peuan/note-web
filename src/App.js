import { router } from "./route";
import { renderRoutes } from "react-router-config";

import "./app.less";
import { AuthContext } from "./contexts";
import { useState } from "react";

const App = () => {
  const [isAuth, setAuth] = useState(false);
  const login = () => {
    setAuth(true);
  };
  const logout = () => {
    setAuth(false);
    console.log(isAuth);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthentication: isAuth,
        loginContext: login,
        logout: logout,
      }}
    >
      {renderRoutes(router)}
    </AuthContext.Provider>
  );
};

export default App;
