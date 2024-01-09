import { IslandButton } from "@/components/_shared/buttons/IslandButton"

type TitleSvgCardProps = {
  type?: 'imgBottomRight',
  title: string,
  text: string,
  cta?: string,
  ctaHref?: string,
  ctaOnClick?: () => void,
  img?: string,
  className?: string,
  hideImgMobile?: boolean,
  Svg?: any
}
export const TitleSvgCard = ({type, title, text, cta, ctaHref, ctaOnClick, img, className, hideImgMobile, Svg}: TitleSvgCardProps) => {
  return (
    <div className={`dashboard-editor-cover__placeholder relative flex flex-col items-center xl:flex-row justify-center ${type === 'imgBottomRight' ? 'xl:justify-start' : ''} gap-[30px] border bg-blackBerry rounded-dashboard-button-square-radius lg:mb-0 overflow-hidden ${className} ${type !== 'imgBottomRight' ? 'px-[53px] py-[61px]' : ''}`}>
      <div className="absolute bg-pattern opacity-20 w-full h-full top-0 left-0"></div>
      
      <div className={`text-center xl:text-left min-w-[150px] max-w-[500px] fullHd:max-w-[600px] z-10 ${type === 'imgBottomRight' ? 'px-[53px] py-[61px]' : ''}`}>
        <div className="n27 text-2xl font-medium">{title}</div>
        <div className="text-base-text mt-4">{text}</div>
        {cta &&
          <IslandButton
            type="primary"
            label={cta}
            href={ctaHref}
            onClick={ctaHref ? undefined : () => { ctaOnClick && ctaOnClick()}}
            className="mt-dashboard-spacing-element-medium"
          />
        }
      </div>

      <div 
        aria-hidden
        className={`shrink-0 ${type === 'imgBottomRight' ? 'xl:absolute xl:right-0 bottom-0 h-full w-full xl:max-w-[480px]' : 'md:self-stretch w-full xl:w-6/12 2xl:w-5/12 xl:max-w-[500px] fullHd:max-w-[300px] '}`}
      >
        <div className={`${hideImgMobile ? 'hidden md:block' : ''} ${type === 'imgBottomRight' ? 'relative right-0 bottom-0 h-full' : 'relative flex justify-center w-full h-auto min-h-[150px] basis-[40%]'} shrink-0 z-0`}>
          {Svg ?
            <Svg 
              alt={'Illustration'}
            />
            :
            <img 
              src={img}
              alt={'Illustration'}
              className={`relative object-cover object-right-bottom overflow-visible h-full w-auto right-0 ${type === 'imgBottomRight' ? '' : ''}`}
            />
          }
        </div>
      </div>
    </div>
  )
}