import Link from "next/link";
import routes from "@/routes";
import { useRouter } from "next/router";
import { SimpleLink } from "./SimpleLink";
import { useContext } from "react";
import { SignInContext } from "../signin/_context/signinContext";

type FooterSigninProps = {
  height: string;
};

export const FooterSignin = ({ height }: FooterSigninProps) => {
  const router = useRouter();
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
      /*
    return (
      <div
        className={`FooterSignin absolute bottom-0 flex justify-center items-center w-screen mt-auto mb-0 h-[75px] border-t`}
      >
        {router.pathname === routes.SIGNIN ? (
          <>
            <span className="text-base-text"> Mot de passe oublié ?&nbsp;</span>
            <SimpleLink
              href={routes.SIGNIN}
              className="text-white"
            >
              Renouveler mon mot de passe
            </SimpleLink>
          </>
        ) : (
          <>
            <span className="text-base-text">
              {" "}
              Nouveau sur editYour.Film ?{" "}
            </span>
            <Link
              href={routes.SIGNUP}
              className="text-violet ml-2.5 text-lg cursor-pointer"
              scroll={false}
            >
              S’inscrire
            </Link>
          </>
        )}
      </div>
      */
    );
  } else return <></>;
};
