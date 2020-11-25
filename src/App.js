/* eslint-disable react-hooks/exhaustive-deps */
import { router } from "./route";
import { renderRoutes } from "react-router-config";
import { Skeleton } from "antd";
import "./app.less";
import { AuthContext } from "./contexts";
import { useEffect, useState } from "react";
import { AuthService } from "./services";

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    const accessToken = AuthService.getAccessToken();
    if (accessToken) {
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    setLoading(true);
    try {
      const user = await AuthService.getProfile();
      login(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const login = (user) => {
    setAuth(true);
    setUser(user);
    console.log(user);
  };
  const logout = () => {
    setAuth(false);
    console.log(isAuth);
  };
  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
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
