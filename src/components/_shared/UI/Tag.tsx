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
  selected?: boolean
}
export const Tag = forwardRef<HTMLDivElement, tagProps>(function Tag ({text, icon = '', onClick = null, onClose = null, selected, bg, hoverColor, className, active = 'true', size, wFull}, ref) {
  let bgColor = "bg-background-dashboard-button-dark hover:bg-dashboard-button-white-default";
  
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
      sizeClass = "p-dashboard-mention-padding-right-left pr-[38px] rounded-lg"
      break;
  }

  let selectedClass = 'bg-dashboard-button-white-default'

  return (
    <div 
      ref={ref}
      className={`${wFull ? 'w-full' : 'w-max'} ${sizeClass} group flex gap-3 items-center ${active ? 'block' : 'hidden'} ${bgColor} ${selected && selectedClass} ${className ?? ''}`}
      onClick={ (e) => {
        switch (selected) {
          case false:
            onClick && onClick(e)
            break;
          case true:
            onClose && onClose()
            break;
        }
       } }
    >
      {(icon || selected) && 
        <div className='rounded-full absolute left-dashboard-mention-padding-right-left w-[22px] h-[22px] border border-white group-hover:border-appleRed overflow-hidden'>
          { (icon === 'cross' || selected) && <CloseIcon
            onClick={(e:MouseEvent) => { 
              e.stopPropagation()
              onClose && onClose() 
            }} 
            className="scale-75 group-hover:svg-color-appleRed"
          />
          }
          {
            (icon && icon !== 'cross' && !selected) &&
            <Image 
              src={icon}
              alt={''}
              width={20}
              height={20}
            />
          }
        </div>
      }
      <span className={`transition-transform ${(icon || selected) ? 'translate-x-[30px]' : ''}`}>{text}</span>
    </div>
  )
} )