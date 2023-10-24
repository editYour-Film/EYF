import { useContext, useEffect } from "react";
import Head from "next/head";
import LayoutSignin, { layoutProps } from "@/components/layouts/LayoutSignin";
import {
  SignInContext,
  SignInContextProvider,
  stepType,
} from "@/components/signin/_context/signinContext";

import { EmailPan } from "@/components/signin/emailPan";
import { CodePan } from "@/components/signin/codePan";
import { TypePan } from "@/components/signin/typePan";
import routes from "@/routes";
import Link from "next/link";
import { FooterSignin } from "@/components/_shared/FooterSignin";
import { useUser } from "@/auth/authContext";
import { getTokenFromLocalCookie } from "@/auth/auth";
import { useRouter } from "next/router";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";

import HeaderSignin from "@/components/_shared/HeaderSignin"

const SignIn:React.FC<layoutProps> = ({previousPath}) => {
  const { push } = useRouter();
  const [userInfo, isLoggedIn] = useUser();

  useEffect(() => {
    const localToken = getTokenFromLocalCookie();
    if (localToken && userInfo) push(routes.DASHBOARD_EDITOR);
  }, []);

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <SignInContextProvider>
        <LayoutSignin>
          <HeaderSignin previousPath={previousPath} ctx={SignInContext} />
          <SignInPanSwitcher />
          <FooterSignin height={"75px"} />
        </LayoutSignin>
      </SignInContextProvider>
    </>
  );
}

const SignInPanSwitcher = () => {
  const context = useContext(SignInContext);
  const router = useRouter()

  const disclaimer = (
    <span>
      En continuant j’accepte les <MentionInteraction onClick={() => { router.push(routes.ML) }}>mentions légales</MentionInteraction>{" "}
      et la <MentionInteraction  onClick={() => { router.push(routes.ML) }}>Politique de confidentialité</MentionInteraction> de
      editYour.Film.
    </span>
  );

  const renderPan = (step: stepType) => {
    switch (step) {
      case 0:
        return <TypePan disclaimer={disclaimer} />;
        break;
      case 1:
        return <EmailPan disclaimer={disclaimer} />;
        break;
      case 2:
        return <CodePan />;
        break;
      default:
         return <></> 
    }
  };

  return renderPan(context.currentStep);
};

export default SignIn