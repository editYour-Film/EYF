import LayoutSignin from "@/components/layouts/LayoutSignin";
import { ChoicePan } from "@/components/signup/ChoicePan";
import { ConfirmEmailPan } from "@/components/signup/ConfirnEmailPan";
import { CreatorPicturePan } from "@/components/signup/CreatorPicturePan";
import { EditorPicturePan } from "@/components/signup/EditorPicturePan";
import { EmailPan } from "@/components/signup/EmailPan";
import { EndingPan } from "@/components/signup/EndingPan";
import { LangAndSkillsPan } from "@/components/signup/LangAndSkillsPan";
import { PersoInfosPan } from "@/components/signup/PersoInfosPan";
import { SignUpContext, SignUpContextProvider, accountType } from "@/components/signup/_context/SignupContext";
import Head from "next/head";
import { useContext } from "react";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <SignUpContextProvider>
        <LayoutSignin>
         <SwitchScreen />
        </LayoutSignin>
      </SignUpContextProvider>
    </>
  );
}

const SwitchScreen = () => {
  const context = useContext(SignUpContext)

  const switcher = (accountType: accountType, currentStep: number) => { 
    let returnValue
    switch (currentStep) {
      case 0:        
        returnValue = <ChoicePan />
        break;
      case 1:
        returnValue = <EmailPan />
        break;
      case 2:
        returnValue = <ConfirmEmailPan />
        break;
      case 3:
        returnValue = <PersoInfosPan />
        break;
      case 4:
        if (accountType === 'editor') {
          returnValue = <EditorPicturePan />
        } else if (accountType === 'creator') {
          returnValue = <CreatorPicturePan />
        } else {
          returnValue = <EditorPicturePan />
        }
        break;
      case 5:
        if (accountType === 'editor') {
          returnValue = <LangAndSkillsPan />
        } else if (accountType === 'creator') {
          returnValue = <EndingPan />
        } else {
          returnValue = <CreatorPicturePan />
        }
        break;
      case 6:
        if (accountType === 'editor') {
          returnValue = <EndingPan />
        } else if (accountType === 'both') {
          returnValue = <LangAndSkillsPan />
        }
        break;
      case 7:
        if (accountType === 'both') {
          returnValue = <EndingPan />
        }
        break;
    
      default:
        break;
    }

    if(returnValue) {
      return(
      <>
        {returnValue}
      </>)
    } else {
      return <></>
    }
  }

  return (
    switcher(context.accountType, context.currentStep)
  )
}