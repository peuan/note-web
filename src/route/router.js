import Exception from "../utils/exception";
import { path } from "./path";
import {
  TagPage,
  NotePage,
  HomePage,
  LoginPage,
  RegisterPage,
  CreateTagPage,
  CreateNotePage,
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
    path: path.note,
    exact: true,
    component: () => <PrivateRoute component={NotePage} />,
  },
  {
    path: path.createNote,
    exact: true,
    component: () => <PrivateRoute component={CreateNotePage} />,
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
    path: path.tag,
    exact: true,
    component: () => <PrivateRoute component={TagPage} />,
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
