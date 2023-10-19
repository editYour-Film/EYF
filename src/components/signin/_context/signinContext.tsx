import routes from "@/routes";
import Link from "next/link";
import { createContext, useEffect, useState } from "react"
import { ReactElement } from "react-markdown/lib/react-markdown";

import Send from '@/icons/signin/send.svg'
import X from '@/icons/signin/x.svg'
import Check from '@/icons/signin/check.svg'

export type stepType = "type" | "email" | "code"
export type codeStateType = "regular" | "loading" | "error" | "success"

export const SignInContext = createContext({
  currentStep: 'type' as stepType,
  setCurrentStep: (payload: stepType) => {},
  email: '',
  setEmail: (payload: string) => {},
  emailErrorMessage: null as ReactElement | null | undefined,
  handleConfirmEmail: ():Promise<boolean> => { return new Promise((resolve) => {}); },
  handleGoogleConnection: () => {},

  code: '',
  setCode: (payload: string) => {},
  codeState: 'regular' as codeStateType,
  resetCodeState: () => {},
  handleCodeVerification: (payload: string) => {},
})

export const SignInContextProvider: React.FC<any> = (props) => {
  const emailErrors = {
    notValid: <span>L’adresse mail renseignée n’est pas valide.</span> ,
    notFound: <span>Aucun compte n'est lié à cette adresse mail. <Link href={routes.SIGNUP_ACCOUNT_TYPE}> <span className="text-dashboard-text-description-base">Créer un compte. </span> </Link> </span>
  }

  const [currentStep, setCurrentStep] = useState<stepType>('type')

  const [email, setEmail] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState<ReactElement | null>()
  
  const [code, setCode] = useState('')
  const [codeState, setCodeState] = useState<codeStateType>('regular')

  const handleConfirmEmail = async () => {
    // Verification logic + return if the email is valid and email is associated with an account
    // Use setTimeout to fake the delay of api request sending
    // if not ok define the emailErrorMessage
    
    return new Promise<boolean> ((resolve) => {      
      setTimeout(() => { 
        resolve(true)
      }, 1000);
    })
  }

  const handleGoogleConnection = () => {

  }

  const handleCodeVerification = (value:string) => {
    // check the code and set the code state accordingly
    setCodeState('loading')

    // Remove Timeout and set the verification
    // on success redirect to dashboard ?
    setTimeout(() => {
      setCodeState('success')
    }, 3000)
  }

  const resetCodeState = () => {
    setCodeState('regular')
  }

  return (
    <SignInContext.Provider
      value={{
        currentStep,
        setCurrentStep,

        email,
        setEmail,
        emailErrorMessage,
        handleConfirmEmail,
        handleGoogleConnection,

        code,
        setCode,
        codeState,
        resetCodeState,
        handleCodeVerification
      }}
    >
      {props.children}
    </SignInContext.Provider>
  )
}