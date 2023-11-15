import { SignInSignUpContainer } from "@/components/_shared/UI/SignInSignUpContainer";

import Input from "../_shared/form/Input";
import Google from "@/icons/google.svg";

import { useContext, useEffect, useRef } from "react";
import { SignUpContext } from "./_context/signupContext";
import { Button } from "../_shared/buttons/Button";
import { ProgressDots } from "../_shared/UI/ProgressDots";
import { LogoSignup } from "./LogoSignup";
import { getGoogleAuthEmailCookie } from "@/auth/auth";

export const EmailPan = () => {
  const context = useContext(SignUpContext);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getGoogleAuthEmailCookie()) context.goNextNoAnimation();
    context.entrance(container);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    context.setContainer(container);

    if (e.key === "Enter") context.handleGoToCode();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="signUp_email max-w-[100vw] w-[360px] px-dashboard-specific-radius md:px-0 pb-[75px]">
      <SignInSignUpContainer ref={container}>
        <LogoSignup />
        <hr className="w-full border-05" />
        <div className="text-large text-center">Ajouter votre email</div>
        <hr className="w-full border-05" />

        <div className="w-full">
          <Input
            type="email"
            label="email"
            placeholder="Entrez votre adresse email"
            bg="light"
            className="w-full"
            error={context.emailErrorMessage}
            noLabel
            value={context.email}
            onChange={(e) => {
              context.setEmail(e.target.value);
            }}
          />
        </div>


        <Button
          type="primary"
          label="Recevoir un code de confirmation"
          onClick={() => {
            context.handleGoToCode();
          }}
          className="w-full"
        />

        <div className="flex flex-row w-full items-center gap-[35px]">
          <div className="basis-full sm:basis-1/2 border-t h-[1px]"></div>
          <span className="hidden sm:block">ou</span>
          <div className="hidden sm:block basis-1/2 border-t h-[1px]"></div>
        </div>

        <a href={process.env.NEXT_PUBLIC_API_STRAPI + "connect/google"}>
          <Button
            type="secondary"
            label="S'inscrire avec Google"
            Icon={Google}
            /*onClick={() => {
            context.handleGoogleConnection();
          }}*/
            onClick={() => {}}
            className="w-full"
          />
        </a>

        {context.dots && <ProgressDots dots={context.dots} />}
      </SignInSignUpContainer>
    </div>
  );
};
