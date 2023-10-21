import routes from "@/routes";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

import { useStrapiPost } from "@/hooks/useStrapi";
import validator from "validator";
import { getTokenFromLocalCookie, setToken } from "@/auth/auth";
import { useUser } from "@/auth/authContext";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { SignedInUser, initSignedInUser } from "@/components/model/signin";

export type stepType = "type" | "email" | "code";
export type codeStateType =
  | "regular"
  | "loading"
  | "error"
  | "errorInvalid"
  | "errorExpired"
  | "errorResend"
  | "success"
  | "successResend";

export const SignInContext = createContext({
  currentStep: "type" as stepType,
  setCurrentStep: (payload: stepType) => {},
  email: "",
  setEmail: (payload: string) => {},
  emailErrorMessage: null as ReactElement | null | undefined,
  handleConfirmEmail: (): Promise<boolean> => {
    return new Promise((resolve) => {});
  },
  handleGoogleConnection: () => {},

  codeState: "regular" as codeStateType,
  setCodeState: (payload: codeStateType) => {},
  resetCodeState: () => {},
  handleCodeVerification: (payload: string) => {},
});

export const SignInContextProvider: React.FC<any> = (props) => {
  const { push } = useRouter();
  const [userInfo, setUserInfo] = useLocalStorage<SignedInUser>(
    "user",
    initSignedInUser
  );
  const [, isLoggedIn] = useUser();

  const emailErrors = {
    generalError: <span>Une erreur inattendue s'est produite.</span>,
    emailNotSent: (
      <span>Erreur lors de l'envoi de l'email de vérification.</span>
    ),
    notValid: <span>L’adresse mail renseignée n’est pas valide.</span>,
    notFound: (
      <span>
        Aucun compte n'est lié à cette adresse mail.{" "}
        <Link href={routes.SIGNUP_ACCOUNT_TYPE}>
          {" "}
          <span className="text-dashboard-text-description-base">
            Créer un compte.{" "}
          </span>{" "}
        </Link>{" "}
      </span>
    ),
  };

  const [currentStep, setCurrentStep] = useState<stepType>("type");

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
          if (generateToken.status === 200) {
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

    if (signinResponse.status === 200) {
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

  useEffect(() => {
    const token = getTokenFromLocalCookie();
    if (token && isLoggedIn) push(routes.DASHBOARD_EDITOR_HOME);
  }, []);

  return (
    <SignInContext.Provider
      value={{
        currentStep,
        setCurrentStep,

        email,
        setEmail,
        emailErrorMessage,
        handleConfirmEmail,
        handleGoogleConnection,

        codeState,
        setCodeState,
        resetCodeState,
        handleCodeVerification,
      }}
    >
      {props.children}
    </SignInContext.Provider>
  );
};
