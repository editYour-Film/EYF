import CloseIcon from '@/icons/dashboard/x.svg'
import { forwardRef } from 'react';
import Image from 'next/image'

type keywordProps = {
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
  selected?: boolean,
  noHover?: boolean,
}
export const Keyword = forwardRef<HTMLDivElement, keywordProps>(function Tag ({text, icon = '', onClick = null, onClose = null, selected, noHover, className, active = 'true', size, wFull}, ref) {
  let hoverClass = 'hover:bg-dashboard-button-dark hover:border-dashboard-button-stroke-hover'

  let bgColor = `bg-dashboard-button-white-default border-dashboard-button-white-opacity-low border border-dashboard-button-white-default text-dashboard-text-description-base text-base ${!noHover ? hoverClass : ''}`;

  let sizeClass = 'p-dashboard-button-separation-spacing rounded-dashboard-button-separation-spacing'
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
        <div className='rounded-full left-dashboard-mention-padding-right-left w-[22px] h-[22px] border border-white hover:border-appleRed overflow-hidden'>
          { (icon === 'cross' || selected) && <CloseIcon
            onClick={(e:MouseEvent) => { 
              e.stopPropagation()
              onClose && onClose() 
            }} 
            className="scale-75 hover:svg-color-appleRed cursor-pointer"
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
      <span className={``}>{text}</span>
    </div>
  )
} )