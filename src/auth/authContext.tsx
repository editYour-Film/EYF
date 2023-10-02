/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useState } from "react";
import { getTokenFromLocalCookie, unsetToken } from "./auth";
import { useStrapiGet } from "@/hooks/useStrapi";
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
    // get user account
    const promise = useStrapiGet("users/me?populate=*", true);
    promise
      .then((userAccountResponse) => {
        if (userAccountResponse.status === 200)
          // get user info
          useStrapiGet(
            "user-infos?filters[user_account][id][$eq]=" +
              userAccountResponse.data.id +
              "&populate=*",
            true
          ).then((userInfoResponse) => {
            if (userInfoResponse.status === 200) {
              if (userInfoResponse.data.data.length > 0)
                // get user models
                useStrapiGet(
                  "editor-videos?filters[user_info][id][$eq]=" +
                    userInfoResponse.data.data[0].id +
                    "&populate=*",
                  true
                ).then((modelResponse) => {
                  if (modelResponse.status === 200) {
                    setUserInfo({
                      user: userAccountResponse.data,
                      details: {
                        id: userInfoResponse.data.data[0].id,
                        ...userInfoResponse.data.data[0].attributes,
                      },
                      models:
                        modelResponse.data.data.length > 0
                          ? modelResponse.data.data
                          : undefined,
                    });
                  }
                  setIsLoading(false);
                });
              else {
                setUserInfo({
                  user: userAccountResponse.data,
                });
                alert(
                  "user info not set, should be redirected to 'complete profile'"
                );
              }
            }
          });
      })
      .catch((error) => {
        unsetToken();
        setIsLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={[userInfo, Object.keys(userInfo.user).length > 0, isLoading]}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
