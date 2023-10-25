/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useState } from "react";
import { getTokenFromLocalCookie, unsetToken } from "./auth";
import useLocalStorage, { removeStorage } from "@/hooks/useLocalStorage";
import { SignedInUser, initSignedInUser } from "@/components/model/signin";
import router from "next/router";
import routes from "@/routes";

export const UserContext = createContext<any>(["", false]);

export const UserProvider: React.FC<any> = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useLocalStorage<SignedInUser>(
    "user",
    initSignedInUser
  );

  useEffect(() => {
    if (!getTokenFromLocalCookie()) {
      removeStorage("user");
      router.push(routes.SIGNIN);
    }
    if (userInfo.user.role) {
      if (userInfo.user.role.name !== "editor") {
        removeStorage("user");
        unsetToken();
      }
    }
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={[
        userInfo,
        Object.keys(userInfo.user).length > 0,
        isLoading,
        setUserInfo,
      ]}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
