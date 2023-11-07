import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { DashBoardContext } from "../_context/DashBoardContext"

import ChevronRight from '@/icons/chevron.svg'
import Moon from '@/icons/moon.svg'
import Close from '@/icons/dashboard/x.svg'

import { EditorProfilContext } from "../_context/ProfilContext"
import { AvatarInput } from "@/components/_shared/form/AvatarInput"
import { TabMenu } from "@/components/_shared/buttons/TabMenu"
import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import { Inputs } from "./DashboardProfil"
import { InputsExperience } from "./DashboardProfilExperiences"
import { AuthContext } from "@/context/authContext"
import { lockDocumentScroll, unLockDocumentScroll } from "@/utils/utils"
import { useLenis } from "@studio-freight/react-lenis"

export const ProfilMobile = () => {
  const authContext = useContext(AuthContext)
  const dashBoardContext = useContext(DashBoardContext)
  const context = useContext(EditorProfilContext)

  const [infoPanActive, setInfoPanActive] = useState(false)
  const [experiencePanActive, setExperiencePanActive] = useState(false)

  const closePannels = (e:KeyboardEvent) => {
    if(e.key === 'Escape') {
      if (infoPanActive) setInfoPanActive(false)
      if (experiencePanActive) setExperiencePanActive(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', closePannels)
    return () => {
      window.removeEventListener('keydown', closePannels)
    }
  }, [experiencePanActive, infoPanActive])  

  return (
    <>
      <div className="profil-mobile relative w-screen overflow-hidden bg-dashboard-background-content-area py-dashboard-spacing-element-medium flex flex-col gap-dashboard-spacing-element-medium px-dashboard-mention-padding-right-left">
        <div className="flex flex-col items-center gap-dashboard-spacing-element-medium">
          <AvatarInput
            img={context.avatar}
            onChange={(e:ChangeEvent) => { context.handleAvatarChange(e) }}
            imgSize="w-[145px] h-[145px]"
          />

          <div className="n27 font-medium text-title-medium uppercase">{context.fName} {context.lName}</div>
        </div>



      <div className="flex flex-col gap-dashboard-button-separation-spacing">
        <TabMenu 
          label="Informations personnelles"
          IconRight={ChevronRight}
          onClick={() => { setInfoPanActive(true) }}
          regularCase
          className="text-medium"
        />
        <hr className="border-t-03"/>

        {
          authContext.user.user.role.type === 'editor' &&
          <>
            <TabMenu 
              label="Expériences"
              IconRight={ChevronRight}
              onClick={() => { setExperiencePanActive(true) }}
              regularCase
              className="text-medium"
            />
            <hr className="border-t-03"/>
        </>
        }

        <TabMenu 
          label="Se déconnecter"
          IconRight={Moon}
          onClick={() => {
            authContext.SignOut()
          }}
          regularCase
          className="text-medium text-dashboard-text-disabled svg-color-dashboard-text-disabled"
        />
      </div>
    </div>
    
    <div className="fixed top-0 left-0 w-screen h-screen overflow-scroll pointer-events-none z-popup">

    </div>

    <InfoPan 
      isActive={infoPanActive} 
      onClose={() => {setInfoPanActive(false)}}
    />

    <ExperiencePan 
      isActive={experiencePanActive} 
      onClose={() => {setExperiencePanActive(false)}}
    />
    </>
  )
}

type InfoPanProps = {
  isActive: boolean,
  onClose: () => void,
}

const InfoPan = ({isActive, onClose}:InfoPanProps) => {
  const lenis = useLenis()
  const scroll = useRef(0)

  useEffect(() => {
    if(isActive) {
      scroll.current = lenis.scroll
      lockDocumentScroll(scroll.current)
    } else {
      unLockDocumentScroll(scroll.current)
    }
  }, [isActive])

  return (
    <div className={`fixed flex flex-col gap-dashboard-spacing-element-medium top-0 left-0 w-screen h-screen bg-blackBerry transition-transform duration-700 ${isActive ? 'translate-x-0' : 'translate-x-full'} z-popup overflow-scroll pointer-events-auto`}>
      <IslandButton
        type="tertiary"
        Icon={Close}
        onClick={() => {onClose && onClose()}}
        iconColor="appleRed"
        className="mt-[50px] mb-dashboard-button-separation-spacing mr-dashboard-button-separation-spacing  self-end w-max"
      />

      <div className="flex flex-col h-max gap-dashboard-spacing-element-medium bg-dashboard-background-content-area pt-dashboard-spacing-element-medium pb-[68px] px-dashboard-mention-padding-right-left">
        <Inputs />
      </div>
    </div>
  )
}

type ExperiencePanProps = {
  isActive: boolean,
  onClose: () => void,
}

const ExperiencePan = ({isActive, onClose}:ExperiencePanProps) => {
  const lenis = useLenis()
  const scroll = useRef(0)

  useEffect(() => {
    if(isActive) {
      scroll.current = lenis.scroll
      lockDocumentScroll(scroll.current)
    } else {
      unLockDocumentScroll(scroll.current)
    }
  }, [isActive])

  return (
    <div className={`fixed flex flex-col gap-dashboard-spacing-element-medium top-0 left-0 w-screen h-screen bg-blackBerry transition-transform duration-700 ${isActive ? 'translate-x-0' : 'translate-x-full'} z-popup overflow-scroll pointer-events-auto`}>
      <IslandButton
        type="tertiary"
        Icon={Close}
        onClick={() => {onClose && onClose()}}
        iconColor="appleRed"
        className="mt-[50px] mb-dashboard-button-separation-spacing mr-dashboard-button-separation-spacing  self-end w-max"
      />

      <div className="flex flex-col h-full gap-dashboard-spacing-element-medium bg-dashboard-background-content-area pt-dashboard-spacing-element-medium pb-[68px] px-dashboard-mention-padding-right-left">
        <InputsExperience />
      </div>
    </div>
  )
}