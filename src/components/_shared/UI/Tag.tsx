import CloseIcon from '@/icons/dashboard/x.svg'
import { forwardRef } from 'react';
import Image from 'next/image'

type tagProps = {
  text: string,
  icon?: string,
  onClick?: (e?:any) => void,
  onClose?: () => void,
  bg?: "primary" | "light",
  hoverColor?: string,
  className?: string,
  active?: boolean,
  wFull?: boolean,
  size?: 'sm',
}
export const Tag = forwardRef<HTMLDivElement, tagProps>(function Tag ({text, icon = '', onClick = null, onClose = null, bg = "primary", hoverColor, className, active = 'true', size, wFull}, ref) {
  let bgColor = "bg-primary-middle";
  
  switch (bg) {
    case "primary":
      bgColor = "bg-primary-middle bg-opacity-40"
      break;
    case "light":
      bgColor = "bg-alphaWhite bg-opacity-10"
      break;
  }

  let sizeClass = 'py-2 px-3 sm:py-3 sm:px-4 md:p-4 rounded-2xl'
  switch (size) {
    case "sm":
      sizeClass = "p-3 rounded-lg"
      break;
  }

  return (
    <div 
      ref={ref}
      className={`${wFull ? 'w-full' : 'w-max'} ${sizeClass} flex gap-3 items-center ${active ? 'block' : 'hidden'} ${bgColor} ${className ?? ''}`}
      onClick={ (e) => { onClick && onClick(e) } }
    >
      {icon && 
        <div className='rounded-full w-[22px] h-[22px] border border-white overflow-hidden'>
          { icon === 'cross' && <CloseIcon
            onClick={() => { onClose && onClose() }} 
            className="scale-75"
          />}
          {
            icon !== 'cross' &&
            <Image 
              src={icon}
              alt={''}
              width={20}
              height={20}
            />
          }
        </div>
      }
      <span>{text}</span>
    </div>
  )
} )