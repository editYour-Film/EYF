import { useContext, useEffect, useRef, useState } from "react"
import { SignInSignUpContainer } from "../_shared/UI/SignInSignUpContainer"
import { SignUpContext } from "./_context/SignupContext"
import { ElementsOut } from "@/Animations/elementsOut"
import { SimpleCard } from "../_shared/UI/CardSimple"
import { Button } from "../_shared/buttons/Button"
import { InfoMessage } from "../_shared/UI/InfoMessage"
import { GeneratedAvatar } from "../_shared/badges/GeneratedAvatar"
import { MentionInteraction } from "../_shared/buttons/MentionInteraction"
import { ElementsIn } from "@/Animations/elementsIn"
import { ProgressDots } from "../_shared/UI/ProgressDots"

import InfoIcon from '@/icons/info.svg'

export const CreatorPicturePan = () => {
  const context = useContext(SignUpContext)
  const container = useRef<HTMLDivElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const [imageToDisplay, setImageToDisplay] = useState<string | undefined>()

  useEffect(() => {
    const elements = Array.from(container.current!.children)

    ElementsIn(elements)
  }, [])

  const handleGoToNext = () => {
    const elements = Array.from(container.current!.children)
    const cb = () => {
      context.setCurrentStep(context.currentStep + 1)
    }

    ElementsOut(elements, {onComplete: cb})
  }

  const handleContinue = () => {
    if(context.creatorPictureOk) {
      const elements = Array.from(container.current!.children)
      const cb = () => {
        context.setCurrentStep(context.currentStep + 1)
      }
  
      ElementsOut(elements, {onComplete: cb})
    }
  }

  useEffect(() => {
    const file = fileInput.current?.files![0]
    
    if (file) {
      setImageToDisplay(URL.createObjectURL(file))
    }

  }, [context.creatorPicture])

  return (
    <div className="creator-picture__pan max-w-[100vw] w-[360px]">
      <SignInSignUpContainer ref={container}>

        <hr className='form-separator'/>

        <div className="flex flex-col gap-dashboard-button-separation-spacing">
          <div className='text-large text-center'>Complétez votre profil public</div>

          <InfoMessage message='Ces informations seront accessibles publiquement sur votre Profil Monteur.se.' Icon={InfoIcon}/>
        </div>


        <hr className='form-separator'/>

        <SimpleCard className="text-center flex flex-col gap-dashboard-spacing-element-medium w-[600px]">
          <div className="flex justify-center gap-dashboard-spacing-element-medium">
              <div 
                className="group flex flex-col gap-dashboard-spacing-element-medium items-center pointer-events-none"
                onClick={() => {
                  fileInput.current?.click()
                }}
              >
                <div className="n27 title-small">{context.username}</div>
                <label htmlFor="avatar" className="absolute w-0 h-0 opacity-0">Ajoutez votre photo de profil</label>
                <input 
                  type="file" 
                  id="avatar"
                  ref={fileInput}
                  value={context.creatorPicture || ''}
                  onChange={(e) => {
                    e.target.files && context.setCreatorPicture(e.target.value);
                  }}
                  className="absolute w-0 h-0 opacity-0 pointer-events-none"
                />

                <GeneratedAvatar type="blue" label={context.initials} className="pointer-events-auto" img={imageToDisplay}/>
                <MentionInteraction className='pointer-events-auto' >Ajoutez votre photo de profil</MentionInteraction>
              </div>

          </div>

        </SimpleCard>

        <hr className='form-separator'/>

        <div className="flex flex-col items-center w-full">
          <Button
            type='primary'
            label="Continuer"
            onClick={() => { handleContinue() }}
            disabled={!(context.creatorPictureOk)}
            className="w-full"
          />

          <MentionInteraction
            onClick={() => {
              handleGoToNext();
            }}
            className="mt-dashboard-mention-padding-right-left"
          >
            Passer
          </MentionInteraction>
        </div>

        {context.dots && <ProgressDots dots={context.dots} />}

      </SignInSignUpContainer>
    </div>
  )
}