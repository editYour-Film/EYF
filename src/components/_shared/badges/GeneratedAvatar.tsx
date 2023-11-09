import Image from 'next/image'

type GeneratedAvatarProps = {
  type?: 'blue' | undefined,
  label?: string,
  img?: string,
  className?: string,
  textSize?: 'sm' | 'default',
  noHover?: boolean
}

export const GeneratedAvatar = ({type, label, img, className, textSize, noHover}:GeneratedAvatarProps) => {
  const textSizeClass = textSize === 'sm' ? 'text-base' : 'text-[40px]' 

  return (
    <div className={`generated-avatar w-full h-full relative flex justify-center items-center border-[1.5px] bg-dashboard-button-dark ${!noHover ? 'group hover:border-dashboard-button-stroke-hover' : ''} rounded-full overflow-hidden translate-z-0 transition-color ${className}`}>
      { img ? 
          <Image
            src={img}
            alt={'profil picture'}
            fill
            className='object-cover'
          />
        :
        <>
          <div className="generated-avatar__gradient absolute w-[150%] h-[150%] left-1/2 top-0 -translate-x-1/2 z-0 group-hover:-translate-y-[30px] transition-transform overflow-hidden rounded-full flex justify-center items-center">
            <div className={`w-[75%] h-[75%] -top-1/4 ${type === 'blue' ? 'bg-radial-gradient-blue' : 'bg-radial-gradient-violet'} rounded-full opacity-80 scale-[0.6]`}></div>
          </div>
          <div className="generated-avatar__black-circle absolute top-[55%] w-full h-full rounded-full bg-dashboard-button-dark z-10 group-hover:translate-y-[15px] transition-transform"></div>

          {label && <div className={`relative z-20 ${textSizeClass} n27 -translate-y-1/4`}>{label}</div>}
        </>
      }
    </div>
  )
}