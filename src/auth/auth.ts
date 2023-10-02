import { removeStorage } from "@/hooks/useLocalStorage";
import routes from "@/routes";
import Cookies from "js-cookie";
import router from "next/router";

export const setToken = (data: any) => {
  if (typeof window === "undefined") return;

  Cookies.set("jwt", data.jwt);
};

export const unsetToken = () => {
  if (typeof window === "undefined") return;

  Cookies.remove("jwt");
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const SignOut = () => {
  unsetToken();
  removeStorage("user");
  router.push(routes.SIGNIN_EMAIL);
};
