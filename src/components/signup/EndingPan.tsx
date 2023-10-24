import { useContext, useEffect, useRef } from "react"
import { SignInSignUpContainer } from "../_shared/UI/SignInSignUpContainer"
import { ElementsOut } from "@/animations/elementsOut"
import { SignUpContext } from "./_context/SignupContext"
import { useRouter } from "next/router"
import routes from "@/routes"

import InstaIcon from '@/icons/instagram.svg'
import TailRight from '@/icons/right-arrow-white.svg'

import { SimpleCard } from "../_shared/UI/CardSimple"
import { Toggle } from "../_shared/buttons/Toggle"
import { Button } from "../_shared/buttons/Button"
import { ProgressDots } from "../_shared/UI/ProgressDots"
import { LogoSignup } from "./LogoSignup"

export const EndingPan = () => {
  const container = useRef<HTMLDivElement>(null)
  const context = useContext(SignUpContext)

  const router = useRouter()

  useEffect(() => {
    context.entrance(container)
  }, [])

  const handleGoToDashboard = () => {
    const elements = Array.from(container.current!.children)
    const cb = () => {
      switch (context.accountType) {
        case 'editor':
          router.push(routes.DASHBOARD_EDITOR_HOME)
          break;
        case 'creator':
          // router.push(routes.DASHBOARD_CREATOR_HOME)
          
          break;
        case 'both':
          // I dont know the route in this case
          // router.push(routes.DASHBOARD_CREATOR_HOME)

          break;
      }
    }

    ElementsOut(elements, {onComplete: cb})
  }

  const handleGoToInsta = () => {

  }

  return (
    <div className="editor-picture__pan max-w-[100vw] w-[360px]">
      <SignInSignUpContainer ref={container}>
        <LogoSignup />
        
        <div className="flex flex-col items-center gap-dashboard-spacing-element-medium px-dashboard-specific-radius md:p-0">
          <hr className='w-full border-05'/>

          <div className="text-center">
            <div className="text-dashboard-text-title-white-high text-large font-medium">Inscrivez-vous à notre newsletter</div>
            <div className="text-dashboard-text-description-base mt-dashboard-mention-padding-right-left">editYour.film s’améliore de jours en jours, c’est le meilleur moyen d’avoir accès aux dernières fonctionnalités et nouveautés de la plateforme.</div>
          </div>
          <hr className='form-separator'/>
        </div>
        

        <SimpleCard className="max-w-[100vw] w-[420px] flex flex-col gap-dashboard-spacing-element-medium">
          <div className="flex items-center gap-dashboard-spacing-element-medium">
            <div>
              <div className="text-base">Rejoindre notre newsletter</div>
              <div className="text-small text-dashboard-text-description-base">Une fois par mois une lettre d’informations pour rester à jours.</div>
            </div>
            <Toggle
              value={context.joinNewsletter}
              onChange={(val) => {
                context.setJoinNewsletter(val)
              }}
            />
          </div>

          <hr className='w-full border-05'/>

          <div className="flex items-center gap-dashboard-spacing-element-medium">
            <div>
              <div className="flex gap-dashboard-mention-padding-right-left items-center text-base"><InstaIcon className='svg-color-soyMilk w-[18px] h-[18px]'/> Suivez-nous</div>
              <div className="text-small text-dashboard-text-description-base">Une fois par semaine, un peu de nous dans votre feed.</div>
            </div>
            <Button 
              label="@edityourfilm"
              type="primary"
              onClick={() => { handleGoToInsta() }}
            />
          </div>
        </SimpleCard>

        <Button 
          label="Accéder à mon espace"
          type="primary"
          Icon={TailRight}
          onClick={() => { handleGoToDashboard() }}
        />

        {context.dots && <ProgressDots dots={context.dots} />}
      </SignInSignUpContainer>
    </div>
  )
}