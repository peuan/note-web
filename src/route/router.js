import Exception from "../utils/exception";
import { path } from "./path";
import {
  NotePage,
  HomePage,
  LoginPage,
  AboutPage,
  RegisterPage,
  CreateTagPage,
} from "../pages";
import PrivateRoute from "./private-route";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <PrivateRoute component={HomePage} />,
  },
  {
    path: path.home,
    exact: true,
    component: () => <PrivateRoute component={HomePage} />,
  },
  {
    path: path.login,
    exact: true,
    component: LoginPage,
  },
  {
    path: path.about,
    exact: true,
    component: () => <PrivateRoute component={AboutPage} />,
  },
  {
    path: path.note,
    exact: true,
    component: () => {
      return <PrivateRoute component={NotePage} />;
    },
  },
  {
    path: path.register,
    exact: true,
    component: RegisterPage,
  },
  {
    path: path.createTag,
    exact: true,
    component: () => <PrivateRoute component={CreateTagPage} />,
  },

  {
    path: "/forbidden",
    exact: true,
    component: () => <Exception code="403" />,
  },
  {
    path: "/notFound",
    exact: true,
    component: () => <Exception code="404" />,
  },
  {
    component: () => <Exception code="404" />,
  },
];

const formattedRoute = routes.map((route) => {
  if (route.routes) {
    route.path = route.routes.map((r) => r.path);
  }
  return route;
});

export default formattedRoute;
