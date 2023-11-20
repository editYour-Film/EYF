
import FooterCircle from '@/img/footerImg.svg'
import { useState } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'

type GradientCardProps = {
  title: string,
  content: string | ReactElement,
  hasCta?: boolean,
  type?: 'text' | 'email',
  ctaLabel?: string,
  placeholder?: string,
  onClick?: (value: string) => void,
  className?: string
}

export const GradientCard = ({title, content, hasCta = false, type = 'text', placeholder, ctaLabel, onClick, className}: GradientCardProps) => {
  const [inPutValue, setInputValue] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  return (
    <div className={`gradient-card relative px-dashboard-mention-padding-right-left py-[53px] lg:p-[53px] rounded-dashboard-button-square-radius overflow-hidden border border-dashboard-button-stroke-hover ${className ?? ''}`}>
      <div className="gradient-card__content relative flex flex-col z-10">
        <div className="lg:basis-5/6 lg:w-5/6">
          <div className="lg:w-2/3 text-dashboard-button-dark text-[55px] n27 font-medium uppercase">{title}</div>
          <div className="lg:w-4/5 text-base text-dashboard-button-island-disabled font-medium">{content}</div>
        </div>

        {hasCta && 
        <>
            <div className='flex flex-col justy gap-[10px] lg:gap-0 lg:flex-row w-full lg:w-5/6 lg:bg-blackBerry lg:pl-[30px] lg:rounded-full items-center lg:overflow-hidden lg:focus-within:outline mt-[33px]'>
            <input
              type={type}
              placeholder={placeholder}
              className='w-full rounded-full lg:rounded-none basis-2/3 shrink grow py-[5px] px-[30px] lg:px-0 bg-blackBerry lg:bg-transparent placeholder:text-dashboard-text-description-base focus:outline lg:focus:outline-none'
              onChange={(e) => { setInputValue(e.target.value)}}
            />
            <div className='hidden lg:block basis-[1px] w-[1px] h-[20px] bg-soyMilk-200 mx-[10px]'></div>
            <button
              onClick={() => {onClick && inPutValue && onClick(inPutValue)}}
              className='w-full lg:w-max rounded-full lg:rounded-none shrink-0 grow-0 py-[5px] px-[30px] transition-colors bg-blackBerry lg:bg-transparent text-dashboard-text-title-white-high hover:bg-dashboard-button-white-hover'
            >{ctaLabel}</button>
          </div>
          
          {error && <div className='text-appleRed px-[30px]'>Il y a des erreurs dans les valeurs</div>}
        </>
        }

      </div>

      <div className="gradient-card__deco absolute w-full h-full top-0 left-0 z-0">
        <div className="absolute w-full h-full top-0 left-0 bg-pattern opacity-30 z-10"></div>
        <div className="absolute w-full h-full top-0 left-0 bg-rose-sunset linear-orientation-270 z-0"></div>
        <FooterCircle className="absolute hidden lg:block top-0 right-0 z-20"/>
      </div>
    </div>
  )
}