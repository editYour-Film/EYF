import { ElementsIn } from "@/animations/elementsIn";
import { ReactElement, useContext, useEffect, useRef } from "react";
import Input from "@/components/_shared/form/Input";
import { Button } from "@/components/_shared/buttons/Button";
import { SignInContext } from "./_context/signinContext";

import Logo from "@/icons/logo.svg";
import Arrow from "@/icons/tailLeft.svg";

type EmailPanProps = {
  disclaimer?: ReactElement;
};

export const EmailPan = ({ disclaimer }: EmailPanProps) => {
  const context = useContext(SignInContext);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    context.setContainer(container);

    const elements = Array.from(container.current!.children);

    ElementsIn(elements);
  }, []);

  const handleConfirmEmail = async () => {
    const emailOk = await context.handleConfirmEmail();

    if (emailOk) context.goNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleConfirmEmail();
  };

  return (
    <div className="signIn_email max-w-[100vw] w-[360px] px-dashboard-specific-radius md:px-0 pb-[75px]">
      <div
        ref={container}
        className="flex flex-col items-center gap-dashboard-spacing-element-medium"
      >
        <Logo className="w-10 h-10" />
        <hr className="w-full border-05" />
        <div className="text-large text-center">
          Se connecter à editYour.film
        </div>
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
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />

          <Button
            type="secondary"
            label="Confirmer mon email"
            disabled={context.email.length === 0}
            onClick={() => {
              handleConfirmEmail();
            }}
            className="w-full mt-dashboard-button-separation-spacing"
          />
        </div>

        <hr className="w-full border-05" />

        <Button
          type="primary"
          label="Autre méthode de connexion"
          Icon={Arrow}
          onClick={() => {
            context.goBack();
          }}
          className="w-full"
        />

        <hr className="w-full" />

        {disclaimer && (
          <div className="text-dashboard-text-disabled text-small font-mediun text-center">
            {disclaimer}
          </div>
        )}
      </div>
    </div>
  );
};
