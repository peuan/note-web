import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts";
import { path } from "./path";

const PrivateRoute = ({ component: Component }) => {
  const history = useHistory();
  const { isAuthentication } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthentication) {
      history.push(path.login);
    }
  }, [isAuthentication]);

  return <Component />;
};
export default PrivateRoute;
