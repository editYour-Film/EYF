import { Button } from "@/components/_shared/buttons/Button";
import { useContext, useEffect, useRef, useState } from "react";
import { SecretCodeInput } from "../_shared/form/SecretCodeInput";
import { SignInContext, codeStateType } from "./_context/signinContext";
import { InfoMessage } from "../_shared/UI/InfoMessage";

import Send from "@/icons/signin/send.svg";
import X from "@/icons/signin/x.svg";
import Connexion from "@/icons/signin/connexion.svg";
import gsap from "gsap";
import { ElementsIn } from "@/Animations/elementsIn";
import { useStrapiPost } from "@/hooks/useStrapi";

export const CodePan = () => {
  const container = useRef<HTMLDivElement>(null);
  const context = useContext(SignInContext);

  useEffect(() => {
    const elements = Array.from(container.current!.children);
    context.setCodeState("regular");
    ElementsIn(elements);
  }, []);

  const handleSendAgain = async () => {
    context.setCodeState("loading");
    const resendToken = await useStrapiPost(
      "generate-token",
      {
        email: context.email,
      },
      false
    );
    if (resendToken.status === 200) context.setCodeState("successResend");
    else context.setCodeState("errorResend");
  };

  const handleGoBack = () => {
    context.setCurrentStep("email");
  };

  const switchMessage = (switchVal: codeStateType) => {
    switch (switchVal) {
      case "regular":
        return (
          <InfoMessage
            message="Ouvrez votre boite mail et ajoutez votre code à 6 chiffres."
            Icon={Send}
          />
        );
      case "loading":
        return (
          <InfoMessage
            message="Ouvrez votre boite mail et ajoutez votre code à 6 chiffres."
            Icon={Send}
          />
        );
      case "error":
        return (
          <InfoMessage
            type="danger"
            message="Une erreur inattendue s'est produite."
            Icon={X}
          />
        );
      case "errorInvalid":
        return (
          <InfoMessage
            type="danger"
            message="Code saisi invalide. Rééssayez ou recevez un nouveau code."
            Icon={X}
          />
        );
      case "errorExpired":
        return (
          <InfoMessage
            type="danger"
            message="Code saisi expiré. Veuillez regénérer un nouveau code."
            Icon={X}
          />
        );
      case "errorResend":
        return (
          <InfoMessage
            type="danger"
            message="Erreur lors de regénération d'un nouveau code."
            Icon={X}
          />
        );
      case "success":
        return <InfoMessage message="Connexion ..." Icon={Connexion} />;
      case "successResend":
        return (
          <InfoMessage message="Code de vérification envoyé." Icon={Send} />
        );
      default:
        break;
    }
  };

  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(messageContainer, {
      opacity: 0,
    });
  }, [context.codeState]);

  return (
    <div className="signIn_code max-w-[100vw] w-[424px]">
      <div
        ref={container}
        className="flex flex-col items-center justify-center gap-dashboard-spacing-element-medium"
      >
        <hr className="w-full" />
        <div className="text-large px-dashboard-specific-radius md:p-0 text-center">
          Vérification de votre compte
        </div>

        <div
          ref={messageContainer}
          className="px-dashboard-specific-radius md:p-0"
        >
          {switchMessage(context.codeState)}
        </div>

        {/* {switchMessage(context.codeState)} */}

        <SecretCodeInput
          state={context.codeState}
          enterCb={(val: string) => {
            context.handleCodeVerification(val);
          }}
          backSpaceCb={() => {
            context.resetCodeState();
          }}
        />

        <hr className="w-full" />

        <div className="w-full px-dashboard-specific-radius md:p-0">
          <Button
            type="secondary"
            label="Renvoyer le code"
            onClick={() => {
              handleSendAgain();
            }}
            className="w-full"
            disabled={context.codeState === "success"}
          />
          <Button
            type="primary"
            label="Retour"
            onClick={() => {
              handleGoBack();
            }}
            className="w-full mt-dashboard-mention-padding-right-left"
            disabled={context.codeState === "success"}
          />
        </div>
      </div>
    </div>
  );
};
