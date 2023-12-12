import { RefObject, createRef, useContext, useEffect, useRef, useState } from "react"
import { AgendaContext } from "../_context/AgendaContext"
import { ReactElement } from "react-markdown/lib/react-markdown"
import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import Close from '@/icons/dashboard/x.svg'
import Chevron from '@/icons/chevron.svg'
import Image from 'next/image'
import Check from '@/icons/check-green.svg'

import { useLenis } from "@studio-freight/react-lenis"
import { lockDocumentScroll, unLockDocumentScroll } from "@/utils/utils"

type AgendaMobileProps = {
  panels: {title: string, panel: ReactElement, month:Date, year: number}[]
}

export const AgendaMobile = ({panels}:AgendaMobileProps) => {
  const agendaContext = useContext(AgendaContext)  
  const [panelsOpen, setPanelsOpen] = useState<boolean[]>([])
  
  useEffect(() => {
    agendaContext.setIsModifying(true)

    return () => {
      agendaContext.setIsModifying(false)
    }
  }, [])

  useEffect(() => {
    setPanelsOpen(panels.map(() => false))
  }, [panels])

  return (
    <>
      <div className="agenda-mobile flex flex-col items-center gap-dashboard-spacing-element-medium">
        <div className="w-4/6 sm:w-1/2 ">
          <div className="relative w-full h-[0] pb-[83%]">
            <Image
              src='/img/dashboard/coffee-clock.svg'
              alt="Illustration d'une machine à café et d'un radioréveil"
              aria-hidden
              fill
            />
          </div>
        </div>
        <div className="uppercase text-title-medium n27 text-dashboard-text-title-white-high font-medium w-full text-center">Gérer mon agenda</div>

        <div className="w-full">
          {panels && panels.map((pan, i) => {
            
            const proposedDays = agendaContext.proposedDays.filter((d) => d.getMonth() === pan.month.getMonth()).length
            

            return (
              <>
                <button
                  className={`group flex items-center justify-between text-dashboard-text-description-base text-medium gap-5 px-5 py-[10px] w-full rounded-dashboard-mention-radius transition-colors duration-600`}
                  onClick={() => {
                    setPanelsOpen(panels.map((p, j) => i === j ? true : panelsOpen[i]))
                  }}
                >
                  <div className="w-max">{pan.title}</div>

                  <div className="flex flex-row items-center gap-dashboard-specific-radius">
                    <div className="flex flex-row min-w-[100px] p-dashboard-mention-padding-right-left gap-[5px] items-center justify-start text-small text-dashboard-text-description-base-low">
                      <Check className={`${proposedDays > 0 ? 'svg-color-success' : 'svg-color-dashboard-text-description-base-low'} w-[24px] h-[24px]`} />
                      <span className="leading-none">{proposedDays} jour(s)</span>
                    </div>

                    <div className="w-3 h-3 flex justify-center items-center">
                      <Chevron 
                        className={`w-full h-full`}
                      />
                    </div>
                  </div>
                </button>
                {i !== panels.length - 1 && <hr />}
              </>
            )
          })}
        </div>
      </div>


      {panels && panels.map((pan, i) => {
        return (
          <Pan 
            year={pan.year}
            title={pan.title}
            key={i} 
            pan={pan}
            onClose={() => {
              setPanelsOpen(panelsOpen.map((pan, j) => i === j ? false : panelsOpen[j]))
            }}
            isOpen={panelsOpen && panelsOpen[i]}
          />
        )
      })}
    </>
  )
}

type PanProps = {
  title: string,
  year: number,
  pan: {title: string, panel: ReactElement},
  onClose?: () => void,
  isOpen: boolean | null
}
const Pan = ({title, year, pan, isOpen, onClose}: PanProps) => {  
  const lenis = useLenis()
  const scroll = useRef(0)

  useEffect(() => {
    if(isOpen) {
      scroll.current = lenis.scroll
      lockDocumentScroll(scroll.current)
    } else {
      unLockDocumentScroll(scroll.current)
    }
  }, [isOpen])

  return (
    <>
      <div
        lenis-prevent
        className={`fixed top-0 left-0 h-screen overflow-scroll pt-[100px] flex flex-col justify-stretch gap-dashboard-spacing-element-medium items-center bg-blackBerry z-popup w-full w-max-screen transition-translate duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-[100vw]'}`}
      >
        <div className="flex flex-row w-full px-dashboard-button-separation-spacing items-end justify-between h-[131px]">
          <div className="uppercase n27 text-title-m text-dashboard-text-description-base">{title} {year}</div>
          <IslandButton
            type="secondary"
            Icon={Close}
            iconColor="appleRed"
            onClick={() => { onClose && onClose() }}
            className="w-max self-end mr-dashboard-button-separation-spacing"
          />
        </div>

        <div className="w-full grow bg-dashboard-background-content-area pt-dashboard-spacing-element-medium pb-[100px]">
          {pan.panel}
        </div>
      </div>
    </>
  )
}