import Image from 'next/image'

type TitleSvgCardProps = {
  title: string,
  text: string,
  img: string,
  className: string
}
export const TitleSvgCard = ({title, text, img, className}: TitleSvgCardProps) => {
  return (
    <div className={`dashboard-editor-cover__placeholder relative border bg-black rounded-3xl mt-8 p-4 lg:p-8 xl:p-14 lg:mb-0 overflow-hidden flex ${className}`}>
      <div className="bg-pattern opacity-20 absolute w-full h-full top-0 left-0"></div>
      <div className="w-7/12">
        <div className="n27 text-2xl font-medium">{title}</div>
        <div className="text-base-text mt-4">{text}</div>
      </div>

      <div className="absolute right-0 bottom-0 w-5/12">
        <Image 
          src={img}
          alt={'Illustration'}
          width={300}
          height={300}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  )
}