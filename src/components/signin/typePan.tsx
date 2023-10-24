import { Button } from '@/components/_shared/buttons/Button'
import { ReactElement, useContext, useEffect, useRef } from 'react'
import { SignInContext } from './_context/signinContext'

import Logo from '@/icons/logo.svg'
import Google from '@/icons/google.svg'
import Arrow from '@/icons/right-arrow-white.svg'
import gsap from 'gsap'
import { ElementsOut } from '@/Animations/elementsOut'
import { ElementsIn } from '@/Animations/elementsIn'

type TypePanProps = {
  disclaimer?: ReactElement
}

export const TypePan = ({disclaimer}: TypePanProps) => {
  const context = useContext(SignInContext)
  const container = useRef<HTMLDivElement>(null)

  const handleGoToEmail = () => {
    const elements = Array.from(container.current!.children)
    const cb = () => {
      context.setCurrentStep('email')
    }

    ElementsOut(elements, {onComplete: cb })
  }

  return (
    <div className="signIn_type max-w-[100vw] w-[360px] px-dashboard-specific-radius md:px-0 pb-[75px]">
      <div ref={container} className="flex flex-col items-center gap-dashboard-spacing-element-medium">
        <Logo />
        <hr className='w-full border-05'/>
        <div className='text-large text-center'>Se connecter à editYour.film</div>
        <hr className='w-full border-05'/>
        <Button 
          type='secondary'
          label='Se connecter avec Google'
          Icon={Google}
          onClick={() => { context.handleGoogleConnection()}}
          className='w-full'
        />
        <hr className='w-full border-05'/>
        <Button 
          type='primary'
          label='Continuer avec un email'
          Icon={Arrow}
          onClick={() => { handleGoToEmail()}}
          className='w-full'
        />

        {disclaimer && 
          <div className='text-dashboard-text-disabled text-small font-mediun text-center'>
            {disclaimer}
          </div>
        }
      </div>
    </div>
  )
}