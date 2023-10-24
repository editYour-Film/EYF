import { SignInSignUpContainer } from '../_shared/UI/SignInSignUpContainer'
import { SimpleCard } from '../_shared/UI/CardSimple'
import { Button } from '../_shared/buttons/Button'

import TailRight from '@/icons/right-arrow-white.svg'
import { SignUpContext } from './_context/SignupContext'
import { useContext, useState, useEffect, useRef } from 'react'
import { Toggle } from '../_shared/buttons/Toggle'

import { ElementsOut } from "@/Animations/elementsOut"
import { ProgressDots } from '../_shared/UI/ProgressDots'
import { LogoSignup } from './LogoSignup'

export const ChoicePan = () => {
  const context = useContext(SignUpContext)

  const [isCreator, setIsCreator] = useState(false)
  const [isEditor, setIsEditor] = useState(false)

  const container = useRef<HTMLDivElement>(null)
  const handleChange = () => {
    if(isCreator && isEditor) context.setAccountType('both');
    else if (isCreator && !isEditor) context.setAccountType('creator');
    else if (isEditor && !isCreator) context.setAccountType('editor');
    else context.setAccountType(undefined);
  }

  useEffect(() => {
    handleChange()
  }, [isCreator, isEditor])

  const handleNextPan = () => {
    context.handleStart()

    if(context.accountType) {
      const elements = Array.from(container.current!.children)

      const cb = () => {
        context.setCurrentStep(context.currentStep + 1)
      }

      ElementsOut(elements, {onComplete: cb})
    }
  }

  return (
    <div className="choice-pan w-[421px] max-w-[100vw]">
      <SignInSignUpContainer ref={container}>
        <LogoSignup />

        <div className='w-full flex flex-col gap-dashboard-spacing-element-medium px-dashboard-specific-radius md:px-0'>
          <hr className="block w-full "/>
          <div className='text-center shadow-text text-large font-medium'>Bienvenue sur editYour.Film</div>
          <hr className='w-full'/>
        </div>



        <SimpleCard className="text-center flex flex-col gap-dashboard-spacing-element-medium">
          <div>
            <div className="text-dashboard-text-title-white-high text-medium font-medium">Je suis</div>
            <div className="text-dashboard-text-description-base mt-dashboard-mention-padding-right-left">editYour.Film vous aide à créer efficacement, que vous soyez créateur.se, monteur.se, ou les deux. Rejoignez-nous pour trouver le monteur qu'il vous faut ou proposer vos services.</div>
          </div>
          <div className="flex flex-col gap-dashboard-button-separation-spacing">
            <Toggle 
              label='Créateur.rice'
              value={context.accountType === 'creator' || context.accountType === 'both'}
              onChange={(value) => { setIsCreator(value); }}
            />
            <hr />
            <Toggle 
              label='Monteur.se'
              value={context.accountType === 'editor' || context.accountType === 'both'}
              onChange={(value) => { setIsEditor(value) }}
            />
          </div>
        </SimpleCard>

        <div className='w-full px-dashboard-specific-radius md:px-0'>
          <Button 
            type='primary'
            label='Commencer'
            Icon={TailRight}
            disabled={context.accountType === undefined}
            onClick={() => { handleNextPan() }}
            className='w-full'
          />
        </div>


        <div className='text-center text-dashboard-text-description-base-low px-dashboard-specific-radius md:px-0'>{context.disclaimer}</div>

        {context.dots && <ProgressDots dots={context.dots} />}
      </SignInSignUpContainer>

    </div>
  )
}