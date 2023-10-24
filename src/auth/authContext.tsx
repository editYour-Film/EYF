/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useState } from "react";
import { getTokenFromLocalCookie, unsetToken } from "./auth";
import useLocalStorage, { removeStorage } from "@/hooks/useLocalStorage";
import { SignedInUser, initSignedInUser } from "@/components/model/signin";

export const UserContext = createContext<any>(["", false]);

export const UserProvider: React.FC<any> = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useLocalStorage<SignedInUser>(
    "user",
    initSignedInUser
  );

  useEffect(() => {
    if (!getTokenFromLocalCookie()) removeStorage("user");
  }, []);

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
