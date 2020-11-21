import Home from "../pages/home";
import Login from "../pages/login";
import About from "../pages/about";
import NotePage from "../pages/note";
import Exception from "../utils/exception";
import { path } from "./path";
import RegistrationPage from "../pages/register";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: path.home,
    exact: true,
    component: Home,
  },
  {
    path: path.login,
    exact: true,
    component: Login,
  },
  {
    path: path.about,
    exact: true,
    component: About,
  },
  {
    path: path.note,
    exact: true,
    component: NotePage,
  },
  {
    path: path.register,
    exact: true,
    component: RegistrationPage,
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
