import routes from "@/routes";
import Link from "next/link";
import { RefObject, createContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

import { useStrapiGet, useStrapiPost } from "@/hooks/useStrapi";
import validator from "validator";
import {
  getTokenFromLocalCookie,
  setGoogleAuthEmailCookie,
  setToken,
  unsetGoogleAuthEmailCookie,
  unsetToken,
} from "@/auth/auth";
import { useUser } from "@/auth/authContext";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { SignedInUser, initSignedInUser } from "@/components/model/signin";
import { ElementsOut } from "@/Animations/elementsOut";
import { inputErrors } from "@/const";
import { getUrlParam } from "@/utils/UrlParams";

export type stepType = number;
export type codeStateType =
  | "regular"
  | "loading"
  | "error"
  | "errorInvalid"
  | "errorExpired"
  | "errorAccountExist"
  | "errorResend"
  | "success"
  | "successResend";

export const SignInContext = createContext({
  currentStep: 0 as stepType,
  setCurrentStep: (payload: stepType) => {},
  email: "",
  setEmail: (payload: string) => {},
  emailErrorMessage: null as ReactElement | null | undefined,
  handleConfirmEmail: (): Promise<boolean> => {
    return new Promise((resolve) => {});
  },

  signUpInError: undefined as string | undefined,

  codeState: "regular" as codeStateType,
  setCodeState: (payload: codeStateType) => {},
  resetCodeState: () => {},
  handleCodeVerification: (payload: string) => {},

  setContainer: (payload: any) => {},
  goBack: () => {},
  goNext: () => {},
});

export const SignInContextProvider: React.FC<any> = (props) => {
  const { push } = useRouter();
  const [userInfo, setUserInfo] = useLocalStorage<SignedInUser>(
    "user",
    initSignedInUser
  );
  const [, isLoggedIn] = useUser();

  const emailErrors = {
    generalError: <span>{inputErrors.general}</span>,
    emailNotSent: (
      <span>Erreur lors de l'envoi de l'email de vérification.</span>
    ),
    notValid: <span>{inputErrors.invalidEmail}</span>,
    notFound: (
      <span>
        Aucun compte n'est lié à cette adresse mail.{" "}
        <Link href={routes.SIGNUP}>
          {" "}
          <span className="text-dashboard-text-description-base">
            Créer un compte.{" "}
          </span>{" "}
        </Link>{" "}
      </span>
    ),
  };

  useEffect(() => {
    const token = getTokenFromLocalCookie();
    if (token && isLoggedIn) {
      if (userInfo && userInfo.user.role)
        if (userInfo.user.role.name === "editor")
          push(routes.DASHBOARD_EDITOR_HOME);
        else setSignUpInError("Dashboard client en cours de developpment");
    }
  }, [userInfo]);

  // handle google auth

  const [signUpInError, setSignUpInError] = useState<string | undefined>();

  useEffect(() => {
    const token = getUrlParam("id_token");
    unsetGoogleAuthEmailCookie();

    if (token) {
      useStrapiGet("auth/google/callback" + location.search, false, false)
        .then(async (response) => {
          setSignUpInError(inputErrors.general);

          if (response.status === 200) {
            const userId = response.data.user.id;

            // get user info
            const userInfo = await useStrapiGet(
              "user-infos?filters[user_account][id][$eq]=" +
                userId +
                "&populate=*",
              false,
              false
            );

            if (userInfo.status === 200) {
              // user exist => sign in
              if (userInfo.data.data.length > 0) {
                // get user role
                const userRole = await useStrapiGet(
                  "users/" + userId + "?populate=*",
                  false,
                  false
                );

                if (userRole.status === 200) {
                  // get account token
                  const token = await useStrapiGet(
                    "api-token/" + userRole.data.role.type,
                    false,
                    false
                  );
                  if (token.status === 200) {
                    // assign role to user
                    const role = userRole.data.role;
                    const user =
                      userInfo.data.data[0].attributes.user_account.data
                        .attributes;
                    user.role = role;
                    setToken({ jwt: token.data });
                    setUserInfo({
                      user: user,
                      details: userInfo.data.data[0].attributes,
                      models: userInfo.data.data[0].attributes?.editor_videos,
                    });
                    location.reload();
                  } else {
                    setSignUpInError(inputErrors.general);
                    unsetToken();
                  }
                } else {
                  setSignUpInError(inputErrors.general);
                  unsetToken();
                }
              }

              // user not exist => sign up
              else {
                // create empty account
                const createAccount = await useStrapiPost(
                  "signup-empty",
                  {
                    accountId: userId,
                  },
                  false
                );
                if (createAccount.status === 200) {
                  setGoogleAuthEmailCookie(response.data.user.email);
                  push(routes.SIGNUP);
                } else setSignUpInError(inputErrors.general);
              }
            } else {
              setSignUpInError(inputErrors.general);
              unsetToken();
            }
          } else {
            if (
              response.data &&
              response.data.message &&
              response.data.message.includes("already taken")
            )
              setSignUpInError(
                "Compte n'est pas créé avec Google provider, veuillez cliquer sur le bouton 'Continuer avec un email' pour continuer."
              );
            else setSignUpInError(inputErrors.general);
            unsetToken();
          }
        })
        .catch((error) => {
          setSignUpInError(inputErrors.general);
          unsetToken();
        });
    }
  }, []);

  useEffect(() => {
    if (signUpInError) setSignUpInError(signUpInError);
  }, [signUpInError]);

  const [currentStep, setCurrentStep] = useState<stepType>(0);

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] =
    useState<ReactElement | null>();

  const [codeState, setCodeState] = useState<codeStateType>("regular");

  const handleConfirmEmail = async () => {
    if (!validator.isEmail(email)) {
      return new Promise<boolean>((resolve) => {
        setEmailErrorMessage(emailErrors.notValid);
      });
    } else {
      const generateToken = await useStrapiPost(
        "generate-token",
        {
          email: email,
        },
        false
      );

      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          if (generateToken.status && generateToken.status === 200) {
            if (typeof generateToken.data === "string") {
              if (generateToken.data.includes("not found"))
                setEmailErrorMessage(emailErrors.notFound);
              else if (generateToken.data.includes("not sent"))
                setEmailErrorMessage(emailErrors.emailNotSent);
            } else if (generateToken.data === true) resolve(true);
          } else setEmailErrorMessage(emailErrors.generalError);
        }, 1000);
      });
    }
  };

  const handleGoogleConnection = () => {};

  const handleCodeVerification = async (value: string) => {
    setCodeState("loading");
    const signinResponse = await useStrapiPost(
      "custom-signin",
      {
        email: email,
        token: value,
      },
      false
    );

    if (signinResponse.status && signinResponse.status === 200) {
      if (typeof signinResponse.data === "string") {
        if (signinResponse.data.includes("not valid"))
          setCodeState("errorInvalid");
        else if (signinResponse.data.includes("expired"))
          setCodeState("errorExpired");
      } else if (typeof signinResponse.data === "object") {
        setCodeState("success");
        setTimeout(() => {
          setToken(signinResponse.data);
          setUserInfo({
            user: signinResponse.data.user,
            details: signinResponse.data.details,
            models: signinResponse.data.models,
          });
          location.reload();
        }, 2000);
      }
    } else setCodeState("error");
  };

  const resetCodeState = () => {
    setCodeState("regular");
  };

  const [container, setContainer] = useState<RefObject<HTMLDivElement> | null>(
    null
  );

  const goBack = () => {
    if (container) {
      const elements = Array.from(container.current!.children);

      ElementsOut(elements, {
        onComplete: () => {
          setCurrentStep(currentStep - 1);
        },
      });
    }
  };

  const goNext = () => {
    if (container) {
      const elements = Array.from(container.current!.children);

      ElementsOut(elements, {
        onComplete: () => {
          setCurrentStep(currentStep + 1);
        },
      });
    }
  };

  return (
    <SignInContext.Provider
      value={{
        currentStep,
        setCurrentStep,

        email,
        setEmail,
        emailErrorMessage,
        handleConfirmEmail,

        signUpInError,

        codeState,
        setCodeState,
        resetCodeState,
        handleCodeVerification,

        setContainer,
        goBack,
        goNext,
      }}
    >
      {props.children}
    </SignInContext.Provider>
  );
};
