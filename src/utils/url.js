import { path } from "../route";

export const replaceUrl = (url = "", from = "/", to = "1") => {
  return url.replace(new RegExp(from, "g"), to);
};

export const getUrlKey = (url = "") => {
  return Object.entries(path).find((path) => path[1] === url)[0];
};
