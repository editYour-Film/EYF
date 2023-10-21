import { useContext, useRef, useState } from "react"
import { SignInSignUpContainer } from "../_shared/UI/SignInSignUpContainer"
import { InfoMessage } from "../_shared/UI/InfoMessage"

import InfoIcon from "@/icons/info.svg"
import { Button } from "../_shared/buttons/Button"
import { ElementsOut } from "@/Animations/elementsOut"
import { SignUpContext } from "./_context/SignupContext"
import { Dropdown } from "../_shared/form/DropdownV2"
import useMediaQuery from "@/hooks/useMediaQuery"
import { ProgressDots } from "../_shared/UI/ProgressDots"

export const LangAndSkillsPan = () => {
  const container = useRef<HTMLDivElement>(null)
  const context = useContext(SignUpContext)

  const [mobileStep, setMobileStep] = useState<0 | 1>(0)
  const isMobile = useMediaQuery(`(max-width:500px`)
  
  const handleGoToNext = () => {
    if (isMobile && mobileStep === 0) {
      setMobileStep(1)
    } else {
      const elements = Array.from(container.current!.children)
      const cb = () => {
        context.setCurrentStep(context.currentStep + 1)
      }
  
      ElementsOut(elements, {onComplete: cb})
    }
  }

  return (
    <div className="editor-picture__pan max-w-[100vw] w-[360px]">
      <SignInSignUpContainer ref={container}>
        <hr className='form-separator'/>

        <div className="flex flex-col gap-dashboard-button-separation-spacing">
          <div className='text-large text-center'>Complétez votre profil public</div>

          <InfoMessage message='Vous pouvez mettre à jour ces informations depuis votre espace personnel.' Icon={InfoIcon}/>
        </div>

        <hr className='form-separator'/>

        <div>
          <div className={`flex ${isMobile ? 'justify-start' : 'justify-center'} ${isMobile && mobileStep === 1 ? '-translate-x-[calc(100%+32px)]' : ''} transition-transform items-stretch gap-dashboard-spacing-element-medium`}>
            <Dropdown 
              title="Je parle"
              label='Sélectionnez les langues que vous parlez'
              mandatory={[context.langOptions[0]]}
              options={context.langOptions}
              selected={context.spokenLanguages}
              onChange={(option) => {
                context.setSpokenLanguages(option)
              }}

              open
              className={`${isMobile ? 'basis-full shrink-0' : 'basis-1/2 shrink-0' }`}
            />

            <Dropdown 
              title="Je travaille avec"
              label='Selectionnez vos compétences'
              options={context.skillsOptions}
              selected={context.skills}
              onChange={(option) => {
                context.setSkills(option)
              }}

              open            
              className={`${isMobile ? 'basis-full shrink-0' : 'basis-1/2 shrink-0' }`}
            />
          </div>
        </div>


        <hr className='form-separator'/>

        <Button
          type="primary"
          onClick={ () => { handleGoToNext() } }
          label="Continuer"
          className="w-full"
        />
        
        {context.dots && <ProgressDots dots={context.dots} />}
      </SignInSignUpContainer>
    </div>
  )
}