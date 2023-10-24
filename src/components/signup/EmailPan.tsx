import { SignInSignUpContainer } from "@/components/_shared/UI/SignInSignUpContainer";

import Logo from "@/icons/logo.svg";
import Input from "../_shared/form/Input";
import Google from "@/icons/google.svg";

import { useContext, useEffect, useRef } from "react";
import { SignUpContext } from "./_context/SignupContext";
import { Button } from "../_shared/buttons/Button";
import { ElementsOut } from "@/Animations/elementsOut";
import { ElementsIn } from "@/Animations/elementsIn";
import { ProgressDots } from "../_shared/UI/ProgressDots";

export const EmailPan = () => {
  const context = useContext(SignUpContext);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(container.current!.children);

    ElementsIn(elements);
  }, []);

  const handleGoToCode = () => {
    const elements = Array.from(container.current!.children);
    const cb = () => {
      context.setCurrentStep(context.currentStep + 1);
    };

    ElementsOut(elements, { onComplete: cb });
  };

  const handleKeyDown = (e:KeyboardEvent) => {
    if (context.emailValid && e.key === 'Enter') {
      handleGoToCode()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  return (
    <div className="signUp_email max-w-[100vw] w-[360px] px-dashboard-specific-radius md:px-0 pb-[75px]">
      <SignInSignUpContainer ref={container}>
        <Logo />
        <hr className="w-full" />
        <div className="text-large text-center">
          Se connecter à editYour.film
        </div>
        <hr className="w-full" />

        <Input
          type="email"
          label="email"
          placeholder="Entrez votre adresse mail"
          bg="light"
          className="w-full"
          error={context.emailErrorMessage}
          noLabel
          value={context.email}
          onChange={(e) => {
            context.setEmail(e.target.value);
            context.handleConfirmEmail();
          }}
        />

        <div className="flex flex-row w-full items-center gap-[35px]">
          <div className="basis-full sm:basis-1/2 border-t h-[1px]"></div>
          <span className="hidden sm:block">ou</span>
          <div className="hidden sm:block basis-1/2 border-t h-[1px]"></div>
        </div>

        <Button
          type="secondary"
          label="S'inscrire avec Google"
          Icon={Google}
          onClick={() => {
            context.handleGoogleConnection();
          }}
          className="w-full"
        />

        <hr className="w-full" />

        <Button
          type="primary"
          label="Recevoir un code de confirmation"
          disabled={!context.emailValid}
          onClick={() => {
            handleGoToCode();
          }}
          className="w-full"
        />

        {context.dots && <ProgressDots dots={context.dots} />}
      </SignInSignUpContainer>
    </div>
  );
};
