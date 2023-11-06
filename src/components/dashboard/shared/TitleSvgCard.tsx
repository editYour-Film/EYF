import Image from 'next/image'

type TitleSvgCardProps = {
  title: string,
  text: string,
  img: string,
  className: string,
  hideImgMobile?: boolean
}
export const TitleSvgCard = ({title, text, img, className, hideImgMobile}: TitleSvgCardProps) => {
  return (
    <div className={`dashboard-editor-cover__placeholder relative flex flex-col items-center xl:flex-row xl:items-center gap-[30px] border bg-black rounded-dashboard-button-square-radius px-[53px] py-[61px] lg:mb-0 overflow-hidden ${className}`}>
      <div className="absolute bg-pattern opacity-20 w-full h-full top-0 left-0"></div>
      
      <div className="text-center xl:text-left z-10">
        <div className="n27 text-2xl font-medium">{title}</div>
        <div className="text-base-text mt-4">{text}</div>
      </div>

      <div className={`${hideImgMobile ? 'hidden md:block' : ''} relative shrink-0 basis-[40%] w-full h-auto min-h-[150px] z-0`}>
        <img 
          src={img}
          alt={'Illustration'}
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  )
}