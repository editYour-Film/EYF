import { Button } from "@/components/_shared/buttons/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { SecretCodeInput } from "../_shared/form/SecretCodeInput"

import { InfoMessage } from "../_shared/UI/InfoMessage"

import Send from '@/icons/signin/send.svg'
import X from '@/icons/signin/x.svg'
import Check from '@/icons/signin/check.svg'

import { ElementsIn } from "@/Animations/elementsIn"
import { SignUpContext } from "./_context/SignupContext"
import { codeStateType } from "../signin/_context/signinContext"
import { SignInSignUpContainer } from "../_shared/UI/SignInSignUpContainer"
import { ElementsOut } from "@/Animations/elementsOut"
import { ProgressDots } from "../_shared/UI/ProgressDots"


export const ConfirmEmailPan = () => {
  const container = useRef<HTMLDivElement>(null)
  const context = useContext(SignUpContext)
  const messageContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = Array.from(container.current!.children)

    ElementsIn(elements)
  }, [])

  const handleSendAgain = () => {

  }

  const handleGoNext = () => {
    const elements = Array.from(container.current!.children)
    const cb = () => {
      context.setCurrentStep(context.currentStep + 1)
    }

    ElementsOut(elements, {onComplete: cb})
  }

  const switchMessage = (switchVal:codeStateType) => {
    switch (switchVal) {
      case 'regular':
        return (
          <InfoMessage 
            message="Ouvrez votre boite mail et ajoutez votre code à 6 chiffres." 
            Icon={Send} 
          />
        )
      case 'loading':
        return (
          <InfoMessage 
            message="Ouvrez votre boite mail et ajoutez votre code à 6 chiffres." 
            Icon={Send} 
          />
        )
      case 'error':
        return (
          <InfoMessage 
            type='danger' 
            message="Code saisi invalide. Rééssayez ou recevez un nouveau code." 
            Icon={X}
          />
        )
      case 'success':
        return (
          <InfoMessage message='Email Validé !' Icon={Check}/>
        )
      default:
        break;
    }
  }

  return (
    <div className="confirm-email__pan max-w-[100vw] w-[424px]">
      <SignInSignUpContainer ref={container}>
        <hr className='form-separator'/>

        <div className="flex flex-col items-center px-dashboard-specific-radius md:p-0">
          <div className='text-large text-center'>Confirmez votre Email</div>
          
          <div 
            ref={messageContainer}
            className="px-dashboard-specific-radius md:p-0 mt-dashboard-button-separation-spacing"
          >
            {switchMessage(context.codeState)}
          </div>
        </div>

        <hr className='form-separator'/>

        <SecretCodeInput 
          state={context.codeState}
          enterCb={(val:string) => { context.handleCodeVerification(val)}}
          backSpaceCb={() => { context.resetCodeState()}}
        />
          
        <hr className='form-separator'/>  

        <div className="w-full px-dashboard-specific-radius md:p-0">
          <Button
            type='secondary'
            label='Renvoyer le code'
            onClick={() => { handleSendAgain()}}
            className="w-full"
            disabled={context.codeState === 'success'}
          />
          <Button 
            type='primary'
            label='Continuer'
            onClick={() => { handleGoNext()}}
            className="w-full mt-dashboard-mention-padding-right-left"
            disabled={context.codeState !== 'success'}
          />
        </div>

        {context.dots && <ProgressDots dots={context.dots} />}

      </SignInSignUpContainer>
    </div>
  )
}