import { useContext, useEffect } from "react";
import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import { SignInContext, SignInContextProvider, stepType } from "@/components/signin/_context/signinContext";

import { EmailPan } from "@/components/signin/emailPan";
import { CodePan } from "@/components/signin/codePan";
import { TypePan } from "@/components/signin/typePan";
import routes from "@/routes";
import Link from "next/link";
import { FooterSignin } from "@/components/_shared/FooterSignin";


export default function SignIn() {
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      
      <SignInContextProvider>
        <LayoutSignin>
          <SignInPanSwitcher />
          <FooterSignin height={'75px'} />
        </LayoutSignin>
      </SignInContextProvider>
    </>
  );
}

const SignInPanSwitcher = () => {
  const context = useContext(SignInContext)

  const disclaimer = <span>En continuant j’accepte les <Link href={routes.ML}>mentions légales</Link> et la <Link href={routes.PC}>Politique de confidentialité</Link> de editYour.Film.</span>

  const renderPan = (step:stepType) => {
    switch(step) {
      case 'type':
        return <TypePan disclaimer={disclaimer}/>
        break;
      case 'email':
        return <EmailPan disclaimer={disclaimer}/>
        break;
      case 'code':
        return <CodePan />
        break;
    }
  }

  return renderPan(context.currentStep)
}
