import Link from "next/link";
import routes from "@/routes";
import { useContext } from "react";
import { SignInContext } from "../signin/_context/signinContext";
import { IslandButton } from "./buttons/IslandButton";

export const FooterSignin = () => {
  const context = useContext(SignInContext);

  if (context.currentStep !== 2) {
    return (
      <div
        className={`FooterSignin absolute bottom-0 flex justify-center items-center w-screen mt-auto mb-0 h-[75px] border-t`}
      >
        <span className="text-base-text"> Nouveau sur editYour.Film ? </span>
        <IslandButton
          label="S’inscrire"
          type="secondary"
          onClick={() => {
            router.push(routes.SIGNUP)
          }}
          className="ml-dashboard-button-separation-spacing"
        />
      </div>
    );
  } else return <></>;
};
