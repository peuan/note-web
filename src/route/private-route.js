import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts";
import Login from "../views/login";
import { path } from "./path";

const PrivateRoute = ({ component }) => {
  const history = useHistory();
  const { isAuthentication } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthentication) {
      history.push(path.login);
    }
  }, [isAuthentication]);

  return component;
};
export default PrivateRoute;
