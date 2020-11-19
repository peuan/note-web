import { router } from "./route";
import { renderRoutes } from "react-router-config";

import "./app.less";

const App = () => {
  return renderRoutes(router);
};

export default App;
