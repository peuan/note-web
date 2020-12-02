export const replaceUrl = (url, from = "/", to = "-") => {
  return url.replace(new RegExp(from, "g"), to);
};
