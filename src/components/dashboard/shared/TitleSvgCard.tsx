import Image from 'next/image'

type TitleSvgCardProps = {
  title: string,
  text: string,
  img: string,
  className: string
}
export const TitleSvgCard = ({title, text, img, className}: TitleSvgCardProps) => {
  return (
    <div className={`dashboard-editor-cover__placeholder relative flex flex-col items-center xl:flex-row gap-[30px] border bg-black rounded-3xl pt-[60px] md:p-4 lg:p-8 xl:p-14 lg:mb-0 overflow-hidden ${className}`}>
      <div className="absolute bg-pattern opacity-20 w-full h-full top-0 left-0"></div>
      
      <div className="text-center px-[60px] xl:text-left xl:basis-7/12">
        <div className="n27 text-2xl font-medium">{title}</div>
        <div className="text-base-text mt-4">{text}</div>
      </div>

      <div className="relative xl:absolute right-0 xl:bottom-0 w-[120%] xl:w-6/12 h-[250px] xl:h-full">
        <Image 
          src={img}
          alt={'Illustration'}
          fill
          className="object-contain xl:object-cover w-full h-full xl:bottom-0"
        />
      </div>
    </div>
  )
}