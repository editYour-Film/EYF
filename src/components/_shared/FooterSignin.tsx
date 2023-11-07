import Link from "next/link";
import routes from "@/routes";
import { useContext } from "react";
import { SignInContext } from "../signin/_context/signinContext";

export const FooterSignin = () => {
  const context = useContext(SignInContext);

  if (context.currentStep !== 2) {
    return (
      <div
        className={`FooterSignin absolute bottom-0 flex justify-center items-center w-screen mt-auto mb-0 h-[75px] border-t`}
      >
        <span className="text-base-text"> Nouveau sur editYour.Film ? </span>
        <Link
          href={routes.SIGNUP}
          className="text-violet ml-2.5 text-lg cursor-pointer"
          scroll={false}
        >
          S’inscrire
        </Link>
      </div>
    );
  } else return <></>;
};
