import { router } from "./route";
import { renderRoutes } from "react-router-config";

import "./app.less";
import { AuthContext } from "./contexts";
import { useState } from "react";

const App = () => {
  const [isAuthentication, setAuthentication] = useState(false);
  const login = () => {
    setAuthentication(true);
  };
  const logout = () => {
    setAuthentication(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthentication: isAuthentication,
        loginContext: login,
        logout: logout,
      }}
    >
      {renderRoutes(router)}
    </AuthContext.Provider>
  );
};

export default App;
