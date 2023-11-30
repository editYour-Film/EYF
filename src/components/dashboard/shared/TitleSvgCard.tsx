import Image from 'next/image'

type TitleSvgCardProps = {
  type?: 'imgBottomRight',
  title: string,
  text: string,
  img?: string,
  className?: string,
  hideImgMobile?: boolean,
  Svg?: any
}
export const TitleSvgCard = ({type, title, text, img, className, hideImgMobile, Svg}: TitleSvgCardProps) => {
  return (
    <div className={`dashboard-editor-cover__placeholder relative flex flex-col items-center xl:flex-row justify-center gap-[30px] border bg-black rounded-dashboard-button-square-radius lg:mb-0 overflow-hidden ${className} ${type !== 'imgBottomRight' ? 'px-[53px] py-[61px]' : ''}`}>
      <div className="absolute bg-pattern opacity-20 w-full h-full top-0 left-0"></div>
      
      <div className={`text-center xl:text-left min-w-[350px] max-w-[500px] fullHd:max-w-[600px] z-10 ${type === 'imgBottomRight' ? 'px-[53px] py-[61px]' : ''}`}>
        <div className="n27 text-2xl font-medium">{title}</div>
        <div className="text-base-text mt-4">{text}</div>
      </div>

      <div className='w-full xl:w-4/12 2xl:w-5/12 xl:max-w-[500px] fullHd:max-w-[300px] shrink-0 md:self-stretch'>
        <div className={`${hideImgMobile ? 'hidden md:block' : ''} ${type === 'imgBottomRight' ? 'relative right-0 bottom-0 h-full w-auto' : 'relative w-full h-auto min-h-[150px]'} shrink-0 basis-[40%] z-0`}>
          {Svg ?
            <Svg 
              alt={'Illustration'}
            />
            :
            <img 
              src={img}
              alt={'Illustration'}
              className={`relative object-cover object-right-bottom overflow-visible h-full w-full right-0 ${type === 'imgBottomRight' ? '' : ''}`}
            />
          }
        </div>
      </div>
    </div>
  )
}