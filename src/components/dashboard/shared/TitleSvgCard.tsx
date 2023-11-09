import Image from 'next/image'

type TitleSvgCardProps = {
  type?: 'imgBottomRight',
  title: string,
  text: string,
  img: string,
  className: string,
  hideImgMobile?: boolean
}
export const TitleSvgCard = ({type, title, text, img, className, hideImgMobile}: TitleSvgCardProps) => {
  return (
    <div className={`dashboard-editor-cover__placeholder relative flex flex-col items-center xl:flex-row xl:items-stretch xl:gap-[30px] border bg-black rounded-dashboard-button-square-radius lg:mb-0 overflow-hidden ${className} ${type !== 'imgBottomRight' ? 'px-[53px] py-[61px]' : ''}`}>
      <div className="absolute bg-pattern opacity-20 w-full h-full top-0 left-0"></div>
      
      <div className={`text-center xl:text-left z-10 ${type === 'imgBottomRight' ? 'px-[53px] py-[61px]' : ''}`}>
        <div className="n27 text-2xl font-medium">{title}</div>
        <div className="text-base-text mt-4">{text}</div>
      </div>

      <div className='w-full h-auto xl:w-5/12 shrink-0'>
        <div className={`${hideImgMobile ? 'hidden md:block' : ''} ${type === 'imgBottomRight' ? 'relative right-0 bottom-0 h-full w-auto' : 'relative w-full h-auto min-h-[150px]'} shrink-0 basis-[40%] z-0`}>
          <img 
            src={img}
            alt={'Illustration'}
            className={`relative object-cover h-full w-full right-0 ${type === 'imgBottomRight' ? '' : ''}`}
          />
        </div>
      </div>
    </div>
  )
}