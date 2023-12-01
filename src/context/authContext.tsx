import { createContext, useEffect, useState } from "react";
import {
  getTempCodeFromLocalCookie,
  getTokenFromLocalCookie,
  setTempCode,
  setToken,
  unsetTempCode,
  unsetToken,
} from "../auth/auth";
import useLocalStorage, { removeStorage } from "@/hooks/useLocalStorage";
import { SignedInUser, initSignedInUser } from "@/components/model/signin";
import router from "next/router";
import routes from "@/routes";
import { useStrapiPost } from "@/hooks/useStrapi";

export const AuthContext = createContext({
  user: initSignedInUser as SignedInUser,
  userCode: "",
  setUserCode: (payload: string) => {},
  isLoggedIn: false,
  isLoading: true,
  SignOut: () => {},
  RefreshUserData: () => {},
});

export const AuthProvider: React.FC<any> = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useLocalStorage<SignedInUser>(
    "user",
    initSignedInUser
  );
  const [userCode, setUserCode] = useState<string>(
    getTempCodeFromLocalCookie() ? (getTempCodeFromLocalCookie() as string) : ""
  );

  const RefreshUserData = (redirect = false) => {
    setIsLoading(true);

    if (userCode && userCode.length > 0) {
      const checkUserByCode = async () => {
        return useStrapiPost(
          "validate-user-by-code",
          {
            code: userCode,
            noExpire: Object.keys(userInfo.user).length > 0,
          },
          false
        );
      };
      checkUserByCode()
        .then((res) => {
          if (res.status === 200 && typeof res.data !== "string") {
            setTempCode(userCode);
            setToken(res.data.jwt);
            setUserInfo({
              user: res.data.user,
              details: res.data.details,
              models: res.data.models,
            });

            if (redirect) {
              if (res.data.user.role.name === "editor")
                router.push(routes.DASHBOARD_EDITOR_HOME);
              else router.push(routes.DASHBOARD_CLIENT_HOME);
            }
          } else SignOut();
          setIsLoading(false);
        })
        .catch(() => {
          SignOut();
          setIsLoading(false);
        });
    }
  };

  const SignOut = (redirect = true) => {
    unsetToken();
    unsetTempCode();
    removeStorage("user");
    removeStorage("register_user");
    if (redirect) router.push(routes.SIGNIN);
  };

  useEffect(() => {
    if (!getTokenFromLocalCookie()) SignOut(false);
  }, []);

  // validate user
  useEffect(() => {
    RefreshUserData();
  }, [userCode]);

  return (
    <AuthContext.Provider
      value={{
        user: userInfo,
        userCode,
        setUserCode,
        isLoggedIn: Object.keys(userInfo.user).length > 0,
        isLoading,
        SignOut,
        RefreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
