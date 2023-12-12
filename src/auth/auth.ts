import { removeStorage } from "@/hooks/useLocalStorage";
import routes from "@/routes";
import Cookies from "js-cookie";
import router from "next/router";

export const setToken = (token: string) => {
  if (typeof window === "undefined") return;

  Cookies.set("permission_token", token);
};

export const setTempCode = (code: string) => {
  if (typeof window === "undefined") return;

  Cookies.set("temp_code", code);
};

export const unsetToken = () => {
  if (typeof window === "undefined") return;

  Cookies.remove("permission_token");
};

export const unsetTempCode = () => {
  if (typeof window === "undefined") return;

  Cookies.remove("temp_code");
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("permission_token");
};

export const getTempCodeFromLocalCookie = () => {
  return Cookies.get("temp_code");
};

export const setGoogleAuthEmailCookie = (email: string) => {
  if (typeof window === "undefined") return;

  Cookies.set("google_auth_email", email);
};

export const unsetGoogleAuthEmailCookie = () => {
  if (typeof window === "undefined") return;

  Cookies.remove("google_auth_email");
};

export const getGoogleAuthEmailCookie = () => {
  return Cookies.get("google_auth_email");
};
