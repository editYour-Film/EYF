import { SimpleCard } from "@/components/_shared/UI/CardSimple";
import React, { useContext, useEffect, useRef, useState } from "react";
import { QuoteContext } from "../_context/QuoteContext";
import { InfoMessage } from "@/components/_shared/UI/InfoMessage";
import Info from '@/icons/info.svg'
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";
import gsap from "gsap";
import routes from "@/routes";
import { useWindowSize } from "@uidotdev/usehooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import { formatDuration } from "@/utils/utils";

export const SliderStep = () => {
  const quoteContext = useContext(QuoteContext)
  const range = useRef<HTMLInputElement>(null)
  const bubble = useRef<HTMLDivElement>(null)
  const rangeWrapper = useRef<HTMLDivElement>(null)

  const ww = typeof window !== 'undefined' ? useWindowSize() : undefined
  const isMobile = useMediaQuery('(max-width: 768px)')

  const rangeMax = 20
  const rangeMin = 0.5

  const [formatedDuration, setFormatedDuration] = useState(formatDuration(quoteContext.selectedDuration ?? rangeMin))

  const RATIO_LENGTH_EDIT_DAYS = 1.25

  useEffect(() => {
    if (range.current && bubble.current) {
      gsap.set(bubble.current, {
        x: (((quoteContext.selectedDuration ?? rangeMin) - rangeMin) / (rangeMax - rangeMin)) * (rangeWrapper.current!.offsetWidth - 50) - bubble.current!.offsetWidth / 2 + 25
      })
    }

    setFormatedDuration(formatDuration(quoteContext.selectedDuration ?? rangeMin))

  }, [quoteContext.selectedDuration, ww])

  const msg = <><span>Déplacez le curseur afin de choisir la durée de votre film. Ou <span className="text-base-bold">Demandez un devis personnalisé</span></span></>

  return (
    <div className="slider-step w-full flex flex-col items-center justify-center gap-dashboard-spacing-element-medium min-h-screen">
      <div className="flex flex-col items-center gap-dashboard-button-separation-spacing max-w-[600px]">
        <div className="text-large shadow-text text-center text-dashboard-text-title-white-high">Choisissez la durée de votre film</div>
        <InfoMessage
          Icon={Info}
          message={msg}
        />
      </div>

      <hr className="w-[360px]"/>
      <SimpleCard
        className="w-full"
        paddingMobileSmall
      >
        <div 
          ref={rangeWrapper}
          className="mt-10 relative">
          
          <div
            ref={bubble}
            className="flex flex-col items-center mb-10"
          >
            <div className="bubble text-small w-[60px] h-[60px] bg-blueBerry flex justify-center items-center rounded-full border-2 border-soyMilk">{(quoteContext.selectedDuration ?? rangeMin) * 60}sec</div>
            <div className="w-[4px] h-[30px] bg-blueBerry pb-[10px] rounded-full"></div>
          </div>

          <input
            ref={range}
            type="range"
            min={rangeMin}
            max={rangeMax}
            step={0.5}
            className="w-full"
            value={quoteContext.selectedDuration ?? rangeMin}
            onChange={(e) => {
              quoteContext.setSelectedDuration(parseFloat(e.target.value))}}
          />

          <div className="flex mt-5 w-full px-[5px]">
            {isMobile && <div>{formatedDuration.min < 10 ? '0' + formatedDuration.min : formatedDuration.min}:{formatedDuration.sec < 10 ? '0' + formatedDuration.sec : formatedDuration.sec}min</div>}
            {!isMobile && [...Array(rangeMax)].map((x, i) => {
              return (
                <React.Fragment
                  key={i}
                >
                  <div className="basis-[2.5%]">
                    <div className="w-[1px] h-3 bg-soyMilk block mb-4 mx-auto"></div>
                  </div>
                  <RangeLabel
                    key={x}
                    number={i + 1}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <p className="mt-3 ml-3 text-sm opacity-70">
            {Math.round(quoteContext.selectedDuration * RATIO_LENGTH_EDIT_DAYS * 10) / 10} Jours de montage nécessaires
          </p>
        </div>
        <div className="flex flex-col items-center gap-dashboard-mention-padding-right-left">
          <div className="text-base text-dashboard-text-description-base">Plus de 20 minutes ?</div>
          <MentionInteraction
            href={routes.QUOTE}
          >
            Demander un devis personnalisé
          </MentionInteraction>
        </div>
      </SimpleCard>
    </div>
  )
}

type RangeLabelProps = {
  number: number;
};
const RangeLabel = ({ number }: RangeLabelProps) => {
  return (
    <div className="text-sm w-[2.5%] text-center relative">
      <span className="w-3 border rotate-90 bg-soyMilk block mb-4 mx-auto"></span>
      {number}
    </div>
  );
};